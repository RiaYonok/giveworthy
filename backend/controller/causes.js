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
/**
 * @description get all the list of causes
 */

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
/**
 * @description get the list of causes for acception
 */

module.exports.getCausesForAcception = function(req, res){
    var resJSON = {
        msg:msg.FAIL,
        desc:"",
        causes:[]
    };
    Cause.find({$or:[{status:'init'},{status:'reviewing'},{status:{$eq:null}}]}, function(err, docs){
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

/**
 * @description get the matched causes
 */

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

/**
 * @description get causes list by tags
 */
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
