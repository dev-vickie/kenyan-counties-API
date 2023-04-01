const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  
  fs.readFile("./counties.json", (err, data) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Something bad happened");
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(data)
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Listening to port 3000"));
