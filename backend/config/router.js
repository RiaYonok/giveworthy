/**
 * Routes all API requests to particular functions
 * This file would be referenced by the 'app.js' file, as;
 * 
 *
 * 	var app  = express();
 *		var routes = require(./router);
 *		
 *	And called
 *
 *		routes.setup(app);
 *
 *
 */

require('rootpath')();

var multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});
// // create the multer instance that will be used to upload/save the file
const upload = multer({ storage: storage })

/**
 * @description those are the variables related with admin panel
 * @property user,
 * @private
 */

 

module.exports.setup = function(app) {

    /**
    * @description these are the endpoints for admin panel
    */

    /* controller modules */
    const user = require("backend/controller/user");
    const uploader = require("backend/controller/uploader");
    /* Routers */
    app.post("/api/login", user.login);
    app.post("/api/signup", user.signup);
    app.post("/api/savecause", user.saveCause);
    app.post("/api/getcause", user.getCause);
    app.post("/api/fileupload", upload.single('file'), uploader.fileUploader);
    app.post("/api/saveuserinfo", user.saveUserInfo);
    app.post("/api/get-mathced-causes", user.getMatchedCauses);
    app.post("/api/get-causes-for-acception", user.getCausesForAcception);
    app.post("/api/getcausesbytag", user.getCausesByTags);
    
    /* route to handel 404 error */
    app.use('*', function(req, res) {
        res.status(404)
            .json({
                message: 'No route found.'
            });
    });
    
    
};