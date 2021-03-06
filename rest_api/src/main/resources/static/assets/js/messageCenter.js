var base_api_url = "http://" + window.location.host;

window.onload = function(){
  resizeMessages();
  
  n =  new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();
  document.getElementById("date").innerHTML = d + "/" + m + "/" + y;
  
  var msg = document.getElementById("msgText");

    msg.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        sendMsg()
      }
    });
    
    viewModel.refreshOffers();
    ko.applyBindings(viewModel);
    activateContact()
}

$(window).resize(resizeMessages);

function resizeMessages() {
  $("#class-room-msgs").css("height", ($("#chat-room-msg-center").css("height").split("px")[0]-135)+"px");
}

function sendMsg(){
    var msg = $("#msgText").val();
    $("#msgText").val("");
    var msgDestin = $("#msgDestination").text();
    if(msg!=="" && msgDestin!==""){
        sendMessage(msg, msgDestin, true);
    }
    
    $('#class-room-msgs').scrollTop($('#class-room-msgs')[0].scrollHeight);
}

async function loadMessages(contact){
    $("#chatRoom").css("visibility", "visible")
    getAllMessages(contact[0]);
    $("#msgDestinName").text(contact[1]);
    $("#msgDestination").text(contact[0]);
    await new Promise(resolve => setTimeout(resolve, 300));
    $('#class-room-msgs').scrollTop($('#class-room-msgs')[0].scrollHeight);
}


function activateContact(){
  setTimeout(function(){
    var url = new URL(window.location.href);
    var addName = url.searchParams.get("addName");
    var addUsername = url.searchParams.get("addUsername");
    var addOfferId = url.searchParams.get("offerId");
    var addOfferTitle = url.searchParams.get("offerTitle");
    if(addName!==null && addUsername!==null){
      if(addOfferId !== null && addOfferTitle !== null) {
        var addOffer = {};
        addOffer["id"] = addOfferId;
        addOffer["title"] = addOfferTitle;
        sendAutomaticMsgUserInterested(addOffer, addUsername);
        
      }
      loadMessages([addUsername, addName])
      $("#chatRoom").css("visibility", "visible")
    }
  }, 500);
}


function sendMsgWithOffer(offer) {
  //console.log(offer);
  var msg = ">>> automatic-message | job-offer: //"+offer.id + "//" + offer.title + "// <<<";
  var msgDestin = $("#msgDestination").text();
  sendMessage(msg, msgDestin, true);
}

function sendAutomaticMsgUserInterested(offer, msgDestin) {
  var msg = ">>> automatic-message-interested | job-offer: //"+offer.id + "//" + offer.title + "// | interested-user: //" + localStorage.getItem("username") + "// <<<";
  sendMessage(msg, msgDestin, true);
}

function formatMessage(id, msg,origin) {
  var retval = msg;
  if(msg.startsWith(">>> automatic-message | ")) {
    var msgArr = msg.split("//");
    if(localStorage.getItem("username") === origin) { 
      retval = "<h3 id='msg_" + msgArr[2] + "'>You sent offer '" + msgArr[2] + "'</h3>";
    } else {
      retval = "<h3>'" + msgArr[2] + "'</h3>"
              +"<button id='accept_" + msgArr[2] + "' class='btn btn-primary' onclick='acceptOfferMsg(" + id + "," + msgArr[1] + ",\"" + msgArr[2] + "\")'>" + "Accept" + "</button>"
              +"<button id='deny_" + msgArr[2] + "' class='btn btn-danger'  onclick='denyOfferMsg(" + id + "," + msgArr[1] + ",\"" + msgArr[2] + "\")'  style='margin-left: 10px;'>" + "Deny" + "</button>";
    }
  }
  if(msg.startsWith(">>> automatic-message-interested | ")) {
    var msgArr = msg.split("//");
    if(localStorage.getItem("username") === origin) { 
      retval = "<h4 id='" + msgArr[2] + "'>You showed interest in '" + msgArr[2] + "'</h4>";
    } else {
      retval = "<h4 id='" + msgArr[2] + "'>" + msgArr[4] + " showed interest in '" + msgArr[2] + "'</h4>";
    }
  }
  return retval;
}

function showOfferOptions(){
    if($("#showOfferOptions").css("display")==="block"){
        $("#showOfferOptions").css("display", "none");
    }else{
        $("#showOfferOptions").css("display", "block");
    }
    
}

function hideOptions(){
    $("#showOfferOptions").css("display", "none");
}

function acceptOfferMsg(id, offerId, offerTitle) {
  var fMsg = "<h3>" + offerTitle + "</h3><h3 id='"+offerTitle+"_accepted' style='color:royalblue'> Accepted</h3>";
  updateAutomaticMessage(id, fMsg, "accept", offerId, $("#msgDestination").text());
  $("#"+id).html(fMsg);
  
}

function denyOfferMsg(id, offerId, offerTitle) {
  var fMsg = "<h3>" + offerTitle + "</h3><h3 style='color:red'> Denied</h3>";
  updateAutomaticMessage(id, fMsg, "deny", offerId, $("#msgDestination").text());
  $("#"+id).html(fMsg);
}

