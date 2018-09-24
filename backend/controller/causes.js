/**
 * Cause API Controller
 */

require('rootpath')();
const msg = require('assets/i18n/en');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");

module.exports.getCauseStatus = function(req, res){
    var params = req.body.params,
        causeId = params.causeId;
    var resJSON = {
        msg:msg.FAIL
    };
    Cause.find({id:causeId}, function(err, docs){
        if (err){
            console.log(err);
        }else{
            if (docs&&docs.length>0){
                resJSON.msg = msg.SUCCESS;
                resJSON.status = docs[0].status;
            }
        }
        res.send(resJSON);
    })
}