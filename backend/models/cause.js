/**
 * @description: Cause model
 * @name: CauseSchema
 * @param: 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uuid = require('uuid/v1');

var CauseSchema = new Schema({
    id:{
        type: String, 
        unique: true
    },
    ownerId:  {
        type: String
    },
    name:{
        type: String
    },
    primaryVideoLink:  {
        type: String
    },
    primaryPhotoLink: { 
        type: String
    },
    webLink: { 
        type: String
    },
    tags:{
        type: String
    },
    description: {
        type: String
    },    
    summary: {
      type: String
    },
    donationIds:  {
        type: [String]
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});
CauseSchema.pre('save', function(next){
    var cause = this;
    cause.updated_at = new Date();
    cause.id = uuid();
    next();
});

module.exports = mongoose.model('Cause', CauseSchema);