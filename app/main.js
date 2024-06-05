const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = data.toString().split(" ");
    console.log(request);
    if(request[1] == '/'){
        socket.write("HTTP/1.1 200 OK\r\n");
    }
    const strRequest = request[1].split('/');
    const echoExists =  strRequest.find((elem) => elem === 'echo');
    if(echoExists){
        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${strRequest[2].length}\r\n\r\n${strRequest[2]}`)
    }
    else{
        socket.write("HTTP/1.1 404 Not Found\r\n")
    }
  });
  socket.on('close', ()=>{
    socket.end();
    server.close();
  })
});

server.listen(4221, "localhost");
