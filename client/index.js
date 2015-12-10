$(document).ready(function(){
    var isSender = true;
    var fromAddress = {country: "US", person: "sender"};
    var toAddress = {country: "US", person: "receiver"};
    var $submit = $("#submit");
    var $senderAddy = $(".senderAddress");
    $submit.on("click", function(e){
        e.preventDefault();
        var $input = $("input");
        if(isSender){
            fromAddress.name = $("#senderName").val();
            fromAddress.street1 = $("#fromStreet1").val();
            fromAddress.street2 = $("#fromStreet2").val();
            fromAddress.city = $("#fromCity").val();
            fromAddress.state = $("#fromState").val();
            fromAddress.zip = $("#fromZip").val();
            fromAddress.phone = $("#fromPhone").val();
            verifyAddress(fromAddress);
        }
        else{
            toAddress.name = $("#senderName").val();
            toAddress.street1 = $("#fromStreet1").val();
            toAddress.street2 = $("#fromStreet2").val();
            toAddress.city = $("#fromCity").val();
            toAddress.state = $("#fromState").val();
            toAddress.zip = $("#fromZip").val();
            toAddress.phone = $("#fromPhone").val();
            verifyAddress(toAddress);
        }
        console.log(toAddress, "toAddress");
    });

    // to verify the sender address
    function verifyAddress(address){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/create",
            data: address,
            success: function(data){
                if(data && isSender){
                    console.log(data);
                    console.log("verify sender")
                    proccedNextInfo();
                }
                else if(data && isSender){
                    console.log("verify receiver");
                    proccedNextInfo();
                }
            }
      });
    }

    // function receiverAddress(address){
    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:3000/api/receiver",
    //         data: address,
    //         success: function(data){
    //         if(data){
    //             proccedNextInfo("toDimension");
    //         }
    //         else{
    //             // proccedNextInfo();
    //         }
    //     }
    //   });
    // }

    function proccedNextInfo(){
        var $input = $("input");
        var $span = $("span");
        $input.val("");
        $span.empty();
        if(isSender){
            $span.append("To Address");
            isSender = false;
        }
        else if(!isSender){
            $span.append("Package Dimension");

        }
    }
});
