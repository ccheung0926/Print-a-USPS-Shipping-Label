var apiKey = "V3uK0HEWHa70O4oTVeZiwg";
var easypost = require('node-easypost')(apiKey);

exports.create = function(req, res){
    var fromAddress = req.body;
    easypost.Address.create(fromAddress, function(err, fromAddress) {
        fromAddress.verify(function(err, response) {
            if (err) {
                console.log('Address is invalid.');
            } else if (response.message !== undefined && response.message !== null) {
                console.log('Address is valid but has an issue: ', response.message);
                var verifiedAddress = response.address;
            } else {
                var verifiedAddress = response;
            }
        });
    });

}