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
    socket = io();
    
    if (localStorage.getItem('msgList')) {
        msgList = JSON.parse(localStorage.getItem('msgList'));
        showMessages();
    }

    document.getElementById('addMessage').onkeydown = function (e) {
        if (e.keyCode != 13) {
            return;
        }
        
        let textElement = document.getElementById('addMessage');
        let msgText = textElement.value;
        
        textElement.value = "";
        msgList.push({text: msgText, publication: getCurrentTime()});
        showMessages();
        localStorage.setItem('msgList', JSON.stringify(msgList));
    }

    function showMessages() {
        let msgStr = "";
        for (let i = 0; i < msgList.length; ++i) {
            msg = msgList[i];
            if (i % 2) {
                msgStr += `
                <div class="rightMessageWrapper">
                  <p>${msg.text}</p>
                  <span class="time-right">${msg.publication}</span>
                </div>
                <br>`;
            } else {
                msgStr += `
                <div class="leftMessageWrapper">
                  <p>${msg.text}</p>
                  <span class="time-left">${msg.publication}</span>
                </div>
                <br>`;
            }
        }
        console.log(msgStr);
        document.getElementById('currentMessages').innerHTML = msgStr;
    }
} 


if(typeof(module.hot) !== 'undefined') { 
    module.hot.accept(); 
}