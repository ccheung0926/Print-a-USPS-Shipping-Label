var apiKey = "V3uK0HEWHa70O4oTVeZiwg";
var easypost = require('node-easypost')(apiKey);
var fromAddress;
var toAddress;
var parcel;
var customsInfo;

exports.create = function(req, res){
    console.log(req.body.person);
    var address = req.body;
    if(req.body.person === "sender"){
        fromAddress = req.body;
        console.log('hey from')
    }
    else{
        toAddress = req.body;
        console.log('yes to');
    }
    easypost.Address.create(address, function(err, address) {
        address.verify(function(err, response) {
            if (err) {
                console.log('Address is invalid.');
            } else if (response.message !== undefined && response.message !== null) {
                console.log('Address is valid but has an issue: ', response.message);
                var verifiedAddress = response.address;
            } 
            else {
                var verifiedAddress = response;
                res.status(201).send(verifiedAddress, "sent hello")
            }
    });
});
}