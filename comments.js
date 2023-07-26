// Create web server
// Create a web server that can respond to requests for /comments.json
// with a JSON-encoded array of comments taken from the file comments.json.
// Assume comments.json is an array of objects like the following:
// [
//   { "author": "author name", "message": "message content", "time": "timestamp" },
//   ...
// ]
// The JSON response should include Access-Control-Allow-Origin: * in the header,
// so that the client browser will not reject the response.
// You'll need to read the comments.json file into a JavaScript array,
// convert it to JSON, and send the response.
// Use the fs and http modules to complete the exercise.
// -----------------------------------------------------------------------------

const http = require('http');
const fs = require('fs');

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/comments.json') {
    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});