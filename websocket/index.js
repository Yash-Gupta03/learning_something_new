const http = require('http');
const WebSocketsServer = require('websocket').server;
let connection = null;

const httpserver = http.createServer((req, res) => {
    console.log('we have received a request');
})

httpserver.listen(8080, ()=> {
    console.log('I am listening');
})

const websocket = new WebSocketsServer({
    "httpServer" : httpserver
})

websocket.on('request', request => {
    connection = request.accept('echo-protocol', request.origin);
    connection.on('open', () => console.log('opened'));
    connection.on('close', () => console.log('closed'));
    connection.on('message', message => {
        console.log('received message', message);
        connection.sendUTF(message.utf8Data);
    })
    sendDataFromServer()
})

function sendDataFromServer(){
    connection.send(Math.random());
    setTimeout(sendDataFromServer, 5000);
}

