const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html;charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.mp4': 'video/mp4' };
http.createServer((q, r) => {
  let f = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  if (f.endsWith(path.sep)) f += 'index.html';
  fs.readFile(f, (e, d) => {
    if (e) { r.statusCode = 404; return r.end('404'); }
    r.setHeader('Content-Type', types[path.extname(f)] || 'application/octet-stream');
    r.end(d);
  });
}).listen(8080, () => console.log('http://localhost:8080'));

