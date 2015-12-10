var toAddress = {
    name: "Dr. Steve Brule",
    street1: "179 N Harbor Dr",
    city: "Redondo Beach",
    state: "CA",
    zip: "90277",
    country: "US",
    phone: "310-808-5243"
};
function sendShipment(address){
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/api/main",
    data: toAddress,
    success: function(data){
      console.log("success", data);
    }
  });
}
sendShipment(toAddress);