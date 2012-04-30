/**
 * Express Document Router
 * @author Nate Ferrero
 */
var findit = require('findit');
var path = require('path');
var fs = require('fs');
module.exports.route = function(app, dir, types) {

  /**
   * Iterate Through Directories
   * @author Robbie Trencheny
   */

  findit.find(dir, function (file) {
    // Split extension
    var ext = path.extname(file).replace('.', '');
    // Split route
    var route = file.replace(dir, '').replace('.'+ext, '').replace(/\/index$/, '');
    // Match ext type
    if(types[ext]) {
      // Define the route
      app.get(route, function(req, res) {
        // Read file contents
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) throw err;
          // Hollaback to handler
          types[ext](data, function(html){
            // Render the content
            res.send(html);
          });
        });
      });
    }
  });
}