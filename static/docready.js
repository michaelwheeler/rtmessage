$(document).ready(function() {
  console.log("document ready");
  var socket = io.connect('/');
  socket.on('message', function(data) {
    console.log("Message received.");
    console.log(data);
    messageDate = new Date(data.date);
    $('#messages').prepend(
      '<div class="message">' +
      '<p class="details"><span class="time">'+messageDate.getHours()+':'+messageDate.getMinutes()+'</span> '+data.message+'</p>' +
      '</div>'
    );
  });
  
  $.ajaxSetup({
    contentType:"application/json; charset=utf-8",
  });
  
  $('input').click(function() {
    message = $('textarea').val();
    $.post('/endpoint', '{"source":"manual", "message":"'+message+'"}', null);
    $('textarea').val("");
    return false;
  });
});