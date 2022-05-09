"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;




connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    //Notification when smbd joins
        if (message === 'joined us') {
            li.setAttribute('style', 'text-align:center;');
            li.textContent = `${user} ${message}`;
        } else {
            if (user === name) {
                li.setAttribute('style', 'text-align:right;');
                li.textContent = `${message}`;
            } else {
                li.textContent = `${user} : ${message}`;
            }
           
        }
    
    
    
});

   // what happens when you join
connection.start().then(function () {
       
    
    name = prompt("Введите свое имя");
    $('#sendButton').val('Send Message as '+name);
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.setAttribute('style', 'text-align:center;');
    connection.invoke("SendMessage", name, 'joined us').catch(function (err) {
        return console.error(err.toString());
    });
   
    
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});
//Send a message
document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
  //  
    connection.invoke("SendMessage", name, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
//Send a group message
document.getElementById("sendRoomButton").addEventListener("click", function (event) {
    var room = document.getElementById("roomInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendGroupMessage", room, name, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("joinRoomButton").addEventListener("click", function (event) {
    var roomName = document.getElementById("roomInput").value;
    connection.invoke("JoinRoom", roomName).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("leaveRoomButton").addEventListener("click", function (event) {
    var room = document.getElementById("roomInput").value;
    connection.invoke("LeaveRoom", room).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});