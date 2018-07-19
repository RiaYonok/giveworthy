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
