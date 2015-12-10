$(document).ready(function(){
    var isSender = true;
    var isPackage = false;
    var intl = false;
    var fromAddress = {person: "sender"};
    var toAddress = {person: "receiver"};
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
        else{

        }
    });

    $("#intl input[name='type']").click(function(){
        console.log(intl);
        if($('#intl input:radio[name=type]:checked').val() === "Yes"){
            intl = true;
        }
        else{
            intl = false;
        }
    });
    // 

    // to verify the sender address
    function verifyAddress(address){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/create",
            data: address,
            success: function(data){
                if(data && isSender && !isPackage){
                    console.log(data);
                    console.log("verify sender")
                    proccedNextInfo();
                }
                else if(data && !isSender && !isPackage){
                    console.log("verify receiver");
                    proccedNextInfo();
                }
            }
      });
    }

    function proccedNextInfo(){
        var $input = $("input");
        var $span = $("span");
        $input.val("");
        $span.empty();
        if(isSender && !isPackage){
            $span.append("To Address");
            $("#intl").append("<input type='radio' name='yesno' value='y' class='yn'>Yes<input type='radio' checked='checked' name='yesno' value='n' class='yn'>No")
            isSender = false;
        }
        else if(!isSender && !isPackage){
            isPackage = true;
            $span.append("Package Dimension");
            $("#senderName").attr("placeholder", "length");
            $("#fromStreet1").attr("placeholder", "width");
            $("#fromStreet2").attr("placeholder", "height");
            $("#fromCity").attr("placeholder", "weight");
            $(".willRemove").empty();
        }
        else{
            console.log(2);
        }
    }
});
