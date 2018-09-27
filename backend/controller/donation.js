/**
 * Donation API Controller
 */

require('rootpath')();
const msg = require('assets/i18n/en');
const User = require("backend/models/user");
const Cause = require("backend/models/cause");
const Donation = require("backend/models/donation");
const StripeHelper = require("backend/utils/StripeHelper");
const uuid = require('uuid/v1');

module.exports.giveDonation = function(req, res){
    const params = req.body.params;
    const causeIds = params.causeIds,
            userId = params.userId,
            amount = parseFloat(params.amount||0);
    var resJSON = {
        msg:msg.FAIL
    };
    if (!userId || userId.length==0 || amount==0){
        res.send(resJSON);
        return;
    }
    User.find({id:userId}, function(err, users){
        if (err){
            console.log(err);
            res.send(resJSON);
        }else{
            const user = users[0];
            if (user && user.paymentInfo&& user.paymentInfo.cusid){
                const cusid = user.paymentInfo.cusid;
                donationProcessByCauses(causeIds, userId, cusid, amount);
                resJSON.msg = msg.SUCCESS;
                res.send(resJSON);
            }
        }
    });
}

function donationProcessByCauses(causeIds, userId, cusid, amount){
    causeIds.forEach(causeId => {
        if (causeId.length>0){
            Cause.find({id:causeId}, function(err, docs){
                if (err){
                    console.log(err);
                }else{
                    var doc = docs[0];
                    console.log(doc);
                    if (doc && doc.status=="approve"){
                        chargeForDonation(cusid,amount, doc.name || doc.id, function(err, charge){
                            if (!err && charge){
                                const donId = uuid();
                                var don = new Donation({
                                    id:donId,
                                    giverId:userId,
                                    causeId:causeId,
                                    amount:amount
                                });
                                don.save();
                                doc.donationIds.push(donId);
                                doc.save();
                            }
                        });
                    }
                }
            });
        }
    });
}

function chargeForDonation(cusid, amount, charityName, cb){
    StripeHelper.createCharge(cusid, amount, "Donation for " + charityName, cb);
}