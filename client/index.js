
function sendShipment(address){
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/homepage",
    data: data,
    success: function(data){
      console.log("success", data);
    }
  });
}