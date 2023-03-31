const http = require("node:http");

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello from a deployed version");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Listening to port 3000"));
