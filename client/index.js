$(document).ready(function(){
    var fromAddress = {person: "sender"};
    var toAddress = {person: "receiver"};
    var parcel = {};  
    var customItem = {};
    var isSender = true;
    var isPackage = false;
    var intl = false;
    var $submit = $("#submit");
    var $senderAddy = $(".senderAddress");

    $submit.on("click", function(e){
        e.preventDefault();
        var $input = $("input");
        console.log("!!", isPackage);
        if(isSender && !isPackage){
            fromAddress.name = $("#name").val();
            fromAddress.street1 = $("#street1").val();
            fromAddress.street2 = $("#street2").val();
            fromAddress.city = $("#city").val();
            fromAddress.state = $("#state").val();
            fromAddress.zip = $("#zip").val();
            fromAddress.country = $("#country").val();
            fromAddress.phone = $("#phone").val();
            verifyAddress(fromAddress);
        }
        else if(!isSender && !isPackage){
            toAddress.name = $("#name").val();
            toAddress.street1 = $("#street1").val();
            toAddress.street2 = $("#street2").val();
            toAddress.city = $("#city").val();
            toAddress.state = $("#state").val();
            toAddress.zip = $("#zip").val();
            toAddress.phone = $("#phone").val();
            verifyAddress(toAddress);
        }
        else if(!isSender && isPackage && !intl){
            parcel.length = $("#name").val();
            parcel.height = $("#street2").val();
            parcel.weight = $("#city").val();
            parcel.width = $("street1").val(); 
            intl = true;
            intlShipmentInfo();
   
        }
        else{
            customItem.description = $("#description").val();
            customItem.hs_tariff_number = $("#hs_tariff_number").val();
            customItem.origin_country = $("#origin_country").val();
            customItem.quantity = $("#origin_country").val();
            customItem.value = $("#value").val();
            customItem.weight = $("#weight").val();
            createShipment({parcel: parcel, customs_items: customItem});
        }
    });

    // to verify the sender address
    function verifyAddress(address){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/verify",
            data: address,
            success: function(data){
                if(data && isSender && !isPackage){
                    proccedNextInfo();
                }
                else if(data && !isSender && !isPackage){
                    proccedNextInfo();
                }
            }
      });
    }

    function createShipment(shipment){
        console.log(parcel, "parcel", customItem);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/ship",
            data: shipment,
            success: function(data){
                console.log(data, "ship");
            }
      });
    }

    function intlShipmentInfo(){
        var item ={ description: "EasyPost t-shirts",
                    hs_tariff_number: 123456,
                    origin_country: "US",
                    quantity: 2,
                    value: 96.27,
                    weight: 21.1
                };
        $("div").empty();
        for(var key in item){
            var $input = $("<p>"+key+": "+"<input id='"+key+"'type='text'placeholder='"+item[key]+"'></p>");
            $input.attr("id", key);
            $("div").append($input);
        }
    }

    function proccedNextInfo(){
        var $input = $("input");
        var $span = $("span");
        $input.val("");
        $span.empty();
        if(isSender && !isPackage){
            $span.append("To Address");
            isSender = false;
        }
        else if(!isSender && !isPackage){
            isPackage = true;
            $span.append("Package Dimension & Info");
            $("#name").attr("placeholder", "length");
            $("#street1").attr("placeholder", "width");
            $("#street2").attr("placeholder", "height");
            $("#city").attr("placeholder", "weight");
            $(".willRemove").empty();
        }
        else{
            console.log(2);
        }
    }
});
