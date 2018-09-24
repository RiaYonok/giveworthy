/**
 * User API Controller
 */

/**
 * @description 
 * the API to user login and signup, profile setting etc
 */

require('rootpath')();
const jwt = require('jsonwebtoken');
const msg = require('assets/i18n/en');
const uuid = require('uuid/v1');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const secertKey = process.env.SECRET_KEY;
const StripeHelper = require("backend/utils/StripeHelper");
/**
 * login controller
 * @param {Object} req 
 * @param {Object} res 
 */
module.exports.login = function(req, res){
    var params = req.body.params,
        email = params.email,
        token = params.token;
    const user = jwt.verify(token, secertKey);
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        access_token:"",
        newUser:0
    };
    if (!user || user.email!= email){
        resJSON.desc=msg.TOKEN_ERROR;
        res.send(resJSON);
    }else{
        
        loginProcess();
    }
    function loginProcess(){

        User.find({email:user.email}, function(err, docs){
            if (err){
                console.log(err);
                resJSON.desc=msg.TOKEN_ERROR;
                res.send(resJSON);
            }else{
                if (!docs || docs.length==0){
                    if (user.googleID || user.facebookID){
                        user.id = uuid();
                        var newUser = new User(user);
                        newUser.save(function(err, savedDoc){
                            resJSON.msg = msg.SUCCESS;
                            resJSON.newUser = 1;
                            resJSON.access_token = jwt.sign(JSON.stringify(savedDoc), secertKey);
                            res.send(resJSON);
                        });
                    }else{
                        resJSON.desc = msg.AUTH_ERROR;
                        res.send(resJSON);
                    }
                }else{
                    var doc = docs[0];
                    if (user.googleID || user.facebookID){
                        doc.googleID = user.googleID;
                        doc.facebookID = user.facebookID;
                        doc.save();
                        resJSON.msg = msg.SUCCESS;
                        resJSON.access_token = jwt.sign(JSON.stringify(doc), secertKey);
                        res.send(resJSON);
                    }else{
                        doc.comparePassword(user.password, function(errMatch, isMatched){
                            if (!errMatch && isMatched){
                                resJSON.msg = msg.SUCCESS;
                                resJSON.access_token = jwt.sign(JSON.stringify(doc), secertKey);
                            }else{
                                resJSON.desc = msg.AUTH_ERROR;
                            }
                            res.send(resJSON);
                        });
                    }
                }
            }
        });
    }
}

module.exports.signup = function(req, res){
    var params = req.body.params,
        email = params.email,
        token = params.token;
    const user = jwt.verify(token, secertKey);
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        access_token:""
    };
    if (!user || user.email!= email){
        resJSON.desc=msg.TOKEN_ERROR;
        res.send(resJSON);
    }else{
        signupProcess();
    }
    function signupProcess(){
        User.find({email:user.email}, function(err, docs){
            if (err){
                console.log(err);
                resJSON.desc=msg.TOKEN_ERROR;
                res.send(resJSON);
            }else{
                if (!docs || docs.length==0){
                    user.id = uuid();
                    var newUser = new User(user);
                    newUser.save(function(err, savedDoc){
                        resJSON.msg = msg.SUCCESS;
                        resJSON.access_token = jwt.sign(JSON.stringify(savedDoc), secertKey);
                        res.send(resJSON);
                    });
                }else{
                    resJSON.desc = msg.DUPLICATED_USER;
                    res.send(resJSON);
                }
            }
        });
    }
}
module.exports.saveUserInfo = function(req, res){
    var params = req.body.params,
        token = params.token;
    const user = jwt.verify(token, secertKey);
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
    };
    if (!user || !user.id || user.id==""){
        resJSON.desc = msg.UNKNOWN_USER;
        res.send(resJSON);
    }else{
        User.find({"id":user.id}, function(err, docs){
            if (err||!docs||docs.length==0){
                resJSON.desc = msg.UNKNOWN_USER;
                res.send(resJSON);
            }else{
                let doc = docs[0];
                let stripeToken = undefined;
                Object.keys(user).forEach(function(key){
                    if (key=="paymentInfo") {
                        Object.keys(user.paymentInfo).forEach(function(pkey){
                            if (pkey=="stripeToken")
                                stripeToken = user.paymentInfo.stripeToken;
                            else
                                doc.paymentInfo[pkey]  = user.paymentInfo[pkey];
                        });
                    }else{
                        doc[key] = user[key];  
                    }
                });
                
                if (stripeToken) {
                    const params = {
                        email: doc.email,
                        source: stripeToken
                    };
                    var cb = function(err, customer) {
                        if (err) {
                            resJSON.msg = err.message;//msg.SUCCESS;
                        }
                        else {
                            doc.paymentInfo.cusid = customer.id;                            
                            doc.save();
                            resJSON.msg = msg.SUCCESS;
                        }   
                        res.send(resJSON);                  
                    };
                    if (doc.paymentInfo.cusid)
                        StripeHelper.updateCustomer( doc.paymentInfo.cusid, params, cb);
                    else
                        StripeHelper.createCustomer(params, cb);
                } else {
                    doc.save();
                    resJSON.msg = msg.SUCCESS;
                    res.send(resJSON);
                }                
            }
            
        });
    }
}

module.exports.saveCause = function(req, res){
    var params = req.body.params,
        id = params.id;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        id:""
    };
    if (!id){
        if (params.ownerId){
            User.find({id:params.ownerId}, function(err, docs){
                if(err){
                    resJSON.desc=msg.DB_ERROR;
                    res.send(resJSON);
                }else{
                    if (docs&&docs.length>0){
                        var user = docs[0];
                        user.type="charity";
                        user.save();
                        params.id = uuid();
                        params.created_at = new Date();
                        params.status = 'init';
                        var cause = new Cause(params);
                        cause.save(function(err1, savedDoc){
                            if (err1){
                                console.log(err1);
                                resJSON.desc=msg.DB_ERROR;
                            }else{
                                resJSON.newCause = 1;
                                resJSON.id = savedDoc.id;
                                resJSON.msg = msg.SUCCESS;
                            }
                            res.send(resJSON);
                        });
                    }else{
                        resJSON.desc = msg.UNKNOWN_USER;
                        res.send(resJSON);
                    }
                }
            });
        }else{
            resJSON.desc = msg.UNKNOWN_USER;
            res.send(resJSON);
        }
    }else{
        Cause.find({id:id}, function(err, docs){
            if (err){
                resJSON.desc=msg.DB_ERROR;
            }else{
                if (docs&&docs.length>0){
                    var doc = docs[0];
                    resJSON.msg = msg.SUCCESS;
                    
                    Object.keys(params).forEach(function(key){
                        doc[key] = params[key];
                    });
                    if (doc.status != "approve" && params.financialDocLink&&params.financialDocLink.length>0){
                        doc.status = "reviewing";
                    };
                    resJSON.status = doc.status;
                    doc.save(function(err, savedDoc){
                        if(err)
                            console.log(err);
                    });
                }else{
                    resJSON.desc = msg.UNKNOWN_CAUSE;
                }
            }
            res.send(resJSON);
        });
    }

}

module.exports.getCause = function(req, res){
    var params = req.body.params,
        id = params.id
    
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    if (!id || id==""){
        resJSON.desc=msg.UNKNOWN_USER;
        res.send(resJSON);
    }else{
        Cause.find({ownerId:id}, function(err, docs){
            if (err){
                console.log(err);
                resJSON.desc=msg.DB_ERROR;
            }else{
                resJSON.msg = msg.SUCCESS;
                resJSON.causes = docs||[];
            }
            res.send(resJSON);
        })
    }
    
}

module.exports.getMatchedCauses = function(req, res){
    var params = req.body.params,
        limit = params.limit || 5;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    Cause.find({}, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.causes = docs||[];
        }
        res.send(resJSON);
    }).limit(limit);
}
module.exports.getCausesByTags = function(req, res){
    var params = req.body.params,
        limit = params.limit || 24;
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    var query = {};
    if (params.filter!='all'){
        query['tags'] = {
            $in:[params.filter]
        }
    }
    Cause.find(query, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.causes = docs||[];
        }
        res.send(resJSON);
    }).limit(limit);
}

module.exports.getCausesForAcception = function(req, res){
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    Cause.find({$or:[{status:'init'},{status:{$eq:null}}]}, function(err, docs){
        if (err){
            console.log(err);
            resJSON.desc=msg.DB_ERROR;
        }else{
            resJSON.msg = msg.SUCCESS;
            resJSON.causes = docs||[];
        }
        res.send(resJSON);
    }).sort({"created_at":-1,"updated_at":-1}).limit(20);
}
