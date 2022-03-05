import { createServer } from 'http';

createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(3000);