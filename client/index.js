$(document).ready(function(){
    var fromAddress = {country: "US"};
    var toAddress = {country: "US"};
    var $submit = $("#submit");
    var $senderAddy = $(".senderAddress");
    $submit.on("click", function(e){
        e.preventDefault();
        var $input = $("input");
        if(Object.keys(fromAddress).length === 1){
            fromAddress.name = $("#senderName").val();
            fromAddress.street1 = $("#fromStreet1").val();
            fromAddress.street2 = $("#fromStreet2").val();
            fromAddress.city = $("#fromCity").val();
            fromAddress.state = $("#fromState").val();
            fromAddress.zip = $("#fromZip").val();
            fromAddress.phone = $("#fromPhone").val();
            senderAddress(fromAddress);
        }
        else{
            toAddress.name = $("#senderName").val();
            toAddress.street1 = $("#fromStreet1").val();
            toAddress.street2 = $("#fromStreet2").val();
            toAddress.city = $("#fromCity").val();
            toAddress.state = $("#fromState").val();
            toAddress.zip = $("#fromZip").val();
            toAddress.phone = $("#fromPhone").val();
            receiverAddress(fromAddress);
        }
    });

    // to verify the sender address
    function senderAddress(address){
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/sender",
        data: address,
        success: function(data){
          if(data){
            proccedNextInfo("toReceiver");
          }
          else{
            // proccedNextInfo();
          }
        }
      });
    }

    function receiverAddress(address){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/receiver",
            data: address,
            success: function(data){
            if(data){
                proccedNextInfo("toDimension");
            }
            else{
                // proccedNextInfo();
            }
        }
      });
    }

    function proccedNextInfo(delivery){
        var $input = $("input");
        var $span = $("span");
        $input.val("");
        $span.empty();
        if(delivery === "toReceiver"){
            $span.append("To Address");
        }
    }
});
