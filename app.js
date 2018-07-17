const messageBox = document.getElementById('messageBox');

let exampleSocket = new WebSocket('ws:127.0.0.1:9080');
exampleSocket.onopen = () => {
    console.log('User connected');
};

function sendMessage() {
    let messageText = document.getElementById('message').value;
    let message = {
        type: 'message',
        text: messageText,
        date: Date.now(),
    };

    exampleSocket.send(JSON.stringify(message));

    messageParse(messageText);
}

exampleSocket.onmessage = function (event) {
    messageParse(JSON.parse(event.data).text);
};

function messageParse(text) {
    let p = document.createElement('p');
    let content = document.createTextNode(text);
    let element = p.appendChild(content);
    messageBox.appendChild(element);
}