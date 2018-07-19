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

// var multer = require('multer');

// var upload = multer({ dest: './uploads/' })

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
    /* Routers */
    app.post("/api/login", user.login);
    app.post("/api/signup", user.signup);

    /* route to handel 404 error */
    app.use('*', function(req, res) {
        res.status(404)
            .json({
                message: 'No route found.'
            });
    });
    
    
};