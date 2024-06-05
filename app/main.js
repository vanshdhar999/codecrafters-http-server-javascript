const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const request = data.toString().split(" ");
    console.log(request);
    const strRequest = request[1].split('/');
    console.log(strRequest);
    socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${strRequest[2].length}\r\n\r\n${strRequest[2]}`)
  });
  socket.on('close', ()=>{
    socket.end();
    server.close();
  })
});

server.listen(4221, "localhost");
