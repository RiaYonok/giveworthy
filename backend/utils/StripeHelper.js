var stripe = require("stripe")(process.env.STRIPE_TEST_SEC_KEY);
require('rootpath')();

module.exports.createCustomer = function(params, cb){
    stripe.customers.create(params, function(err, customer) {
        cb(err, customer);            
    });
}

module.exports.updateCustomer = function(cusid, params, cb){
    stripe.customers.update(cusid, params, function(err, customer) {
        cb(err, customer);            
    });
};