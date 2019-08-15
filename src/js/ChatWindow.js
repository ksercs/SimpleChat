/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict;'

const url = "http://192.168.110.174:3000/";

function getCurrentTime() {
    let now = new Date();
    let hours = '' + now.getHours()
        minutes = '' + now.getMinutes();
    
    formatDate = ((date) => date.length == 2 ? date : '0' + date);

    return formatDate(hours) + ':' + formatDate(minutes);
}

window.onload = function() {
    let msgList = [];
    socket = io.connect(url);
    cur_username = ""

    if (localStorage.getItem('msgList')) {
        msgList = JSON.parse(localStorage.getItem('msgList'));   
    }

    socket.on('userName', function(userName){
        console.log('Your username is => ' + userName);
        cur_username = userName;
        msgList.push({text: `You connected as ${userName}`, publication: getCurrentTime(), name: "INFO"});
        showMessages();
    });

    socket.on('newUser', function(userName){
        console.log('New user connected to chat: ' + userName);
        msgList.push({text: `New user ${userName} connected!`, publication: getCurrentTime(), name: "INFO"});
        showMessages();
    });



    document.getElementById('addMessage').onkeydown = function (e) {
        if (e.keyCode != 13) {
            return;
        }
        
        let textElement = document.getElementById('addMessage');
        let msgText = textElement.value;
        socket.emit('message', msgText);
        textElement.value = "";
    }

    socket.on('messageToClients', function(msg, name){
        console.log(name + ' | => ' + msg);
        msgList.push({text: msg, publication: getCurrentTime(), name});
        showMessages();
        localStorage.setItem('msgList', JSON.stringify(msgList));
    });

    socket.on('dissconectUser', function(name){
        console.log(`User ${name} dissconected`);
        msgList.push({text: `User ${name} dissconected`, publication: getCurrentTime(), name: "INFO"});
        showMessages();
        localStorage.setItem('msgList', JSON.stringify(msgList));
    });

    function showMessages() {
        let msgStr = "";
        for (let i = 0; i < msgList.length; ++i) {
            msg = msgList[i];
            if (msg.name == "INFO") {
                msgStr += `
                <div class="centerMessageWrapper">
                  <p>${msg.text}</p>
                  <span class="time-center">${msg.publication}</span>
                </div>
                <br>`;
            } else if (msg.name != cur_username) {
                msgStr += `
                <div class="leftMessageWrapper">
                  <span class="name-left">${msg.name}</span>
                  <p>${msg.text}</p>
                  <span class="time-left">${msg.publication}</span>
                </div>
                <br>`;
            } else {
                msgStr += `
                <div class="rightMessageWrapper">
                  <span class="name-right">${msg.name}</span>
                  <p>${msg.text}</p>
                  <span class="time-right">${msg.publication}</span>
                </div>
                <br>`;
            }
        }
        document.getElementById('currentMessages').innerHTML = msgStr;
    }
} 


if(typeof(module.hot) !== 'undefined') { 
    module.hot.accept(); 
}