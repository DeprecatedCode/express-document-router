/**
 * Express Document Router
 * @author Nate Ferrero
 */
module.exports.route = function(app, dir, types) {

	/**
	 * Iterate Through Directories
	 * @author Robbie Trencheny
	 */


	for each one check types[extension] such as type.jade
	do app.get('/path/to/file', function(req, res) {

		load file contents

		then

		types[extension](file contents, function(html) {
			res.send(html);
		});
	})

}