$(document).ready(function(){
    var fromAddress = {country: "US"};
    var toAddress = {country: "US"};
    var $submit = $("#submit");
    var $senderAddy = $(".senderAddress");
    $submit.on("click", function(e){
        e.preventDefault();
        var $input = $("input");
        fromAddress.name = $("#senderName").val();
        fromAddress.street1 = $("#fromStreet1").val();
        fromAddress.street2 = $("#fromStreet2").val();
        fromAddress.city = $("#fromCity").val();
        fromAddress.state = $("#fromState").val();
        fromAddress.zip = $("#fromZip").val();
        fromAddress.phone = $("#fromPhone").val();
        senderAddress(fromAddress);
    });


    function senderAddress(address){
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/sender",
        data: address,
        success: function(data){
          if(data){
            proccedNextInfo();
          }
          else{
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
        $span.append("To Address");
    }
});
