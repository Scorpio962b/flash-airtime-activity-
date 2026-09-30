// Minimal static server for the Flash wallet airtime demo: node airtime-app/server.js
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 3001;
const publicDir = path.join(__dirname, 'public');
const routes = { '/airtime': 'airtime.html', '/airtime-rules.js': 'airtime-rules.js' };
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

http.createServer((req, res) => {
  const file = routes[new URL(req.url, `http://localhost:${PORT}`).pathname];
  if (!file) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] });
  fs.createReadStream(path.join(publicDir, file)).pipe(res);
}).listen(PORT, () => console.log(`Flash airtime demo on http://localhost:${PORT}/airtime`));
