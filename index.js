/**
 * Express Document Router
 * @author Nate Ferrero
 */
var findit = require('findit');
var path = require('path');
var fs = require('fs');

/**
 * Route
 * @author Nate Ferrero
 * @param app - your express app
 * @param dir - root document dir
 * @param types - an object containing the extensions you
 * wish to route, and a function to handle them which calls
 * back with HTML. Example: 
 * {
 *    extension: function(contents, options, callback) {
 *      callback('HTML from: ' + options.filename);
 *    },
 *    html: function( ... ) { ... handle HTML files ...}
 * }
 */
module.exports.route = function(app, dir, types) {

  /**
   * Iterate Through Directories
   * @author Robbie Trencheny
   */
  findit.find(dir, function (file) {

    /**
     * Get extension
     */
    var ext = path.extname(file).replace('.', '');

    /**
     * Format route
     */
    var route = file.replace(dir, '').replace('.'+ext, '').replace(/\/index$/, '');
    
    /**
     * Check for matching extension handler
     */
    if(types[ext]) {

      /**
       * Create a wrapper
       */
      var handler = function(req, res) {

        /**
         * Read file contents
         */
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) throw err;

          /**
           * Call extension handler
           */
          types[ext](data, {filename: file}, function(html) {

            /**
             * Render the content
             */
            res.send(html);
          });
        });
      }

      /**
       * Add the routes to express
       */
      app.get(route, handler);
      app.get(route + '/*', handler);
    }
  });
}