const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  const urlPath = decodeURIComponent(urlParts[0]);

  // Headers anti-cache para garantir que toda alteração apareça imediatamente no navegador
  const noCacheHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*'
  };

  // Simulação local de API para formulário de orçamento
  if (req.method === 'POST' && urlPath === '/api/enviar-orcamento.php') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log(`[${new Date().toLocaleTimeString()}] [API] Recebido formulário:`, body);
      res.writeHead(200, {
        ...noCacheHeaders,
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({ ok: true, mensagem: 'Orçamento recebido com sucesso!' }));
    });
    return;
  }

  let safePath = path.normalize(path.join(ROOT, urlPath));

  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403, noCacheHeaders);
    res.end('Acesso negado');
    return;
  }

  // Se for diretório, procura index.html
  if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
    const indexPath = path.join(safePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      safePath = indexPath;
    }
  }

  // Se não existir, tenta com .html (rotas limpas sem .html na URL)
  if (!fs.existsSync(safePath) && fs.existsSync(safePath + '.html')) {
    safePath = safePath + '.html';
  }

  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      ...noCacheHeaders,
      'Content-Type': contentType
    });
    console.log(`[${new Date().toLocaleTimeString()}] [200 OK] ${req.url} -> ${path.relative(ROOT, safePath)}`);
    fs.createReadStream(safePath).pipe(res);
  } else {
    console.warn(`[${new Date().toLocaleTimeString()}] [404] ${req.url} (Não encontrado)`);
    const notFound = path.join(ROOT, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, {
        ...noCacheHeaders,
        'Content-Type': 'text/html; charset=utf-8'
      });
      fs.createReadStream(notFound).pipe(res);
    } else {
      res.writeHead(404, noCacheHeaders);
      res.end('Página não encontrada');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`SERVIDOR ATIVO EM: http://localhost:${PORT}`);
  console.log(`(Atenção: A porta correta é 3000, com 3 zeros)`);
  console.log(`Cache desativado: toda alteração é refletida em tempo real`);
  console.log(`=======================================================`);
});

server.on('error', (err) => {
  console.error('ERRO NO SERVIDOR HTTP:', err);
});
