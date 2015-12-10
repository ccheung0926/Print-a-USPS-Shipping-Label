var apiKey = "V3uK0HEWHa70O4oTVeZiwg";
var easypost = require('node-easypost')(apiKey);
var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
var fromAddress;
var toAddress;
var parcel;
var customsInfo = {
        customs_certify: 1,
        customs_signer: "Hector Hammerfall",
        contents_type: "gift",
        contents_explanation: "",
        eel_pfc: "NOEEI 30.37(a)",
        non_delivery_option: "return",
        restriction_type: "none",
        restriction_comments: ""
};  

exports.verify = function(req, res){
    var address = req.body;
    if(req.body.person === "sender"){
        fromAddress = req.body;
    }
    else{
        toAddress = req.body;
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

exports.ship = function(req, res){
    var tempFile= __dirname + "server/label.png";
    customsInfo.customs_item = [req.body.customs_item];
    easypost.Shipment.create({
        to_address: toAddress,
        from_address: fromAddress,
        parcel: req.body.parcel,
        customs_info: customsInfo
    }, function(err, shipment) {
        res.sendFile(tempFile, options, function(err){
            if(err){
                console.log(err);
                res.status(err.status).end();
            }
            else{
                console.log("sent", tempFile);
            }
        });
    });
    // buy postage label with one of the rate objects
    // shipment.buy({rate: shipment.lowestRate(['USPS', 'ups']), insurance: 100.00}, function(err, shipment) {
    //     console.log(shipment.tracking_code);
    //     console.log(shipment.postage_label.label_url);
    //     res.send({label: shipment.postage_label.label_url, tracking: shipment.tracking_code});
    // });
}