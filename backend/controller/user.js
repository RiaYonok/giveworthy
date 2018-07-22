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
        
        //res.send(resJSON);
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
                    doc.save();
                }else{
                    resJSON.desc = msg.UNKNOWN_CAUSE;
                }
            }
            res.send(resJSON);
        });
    }

}