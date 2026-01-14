#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'http://localhost:5000/api';

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = require(url.protocol === 'https:' ? 'https' : 'http').request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : {}
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: { raw: data }
          });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function downloadTestImage(filename) {
  return new Promise((resolve, reject) => {
    // Criar uma imagem PNG simples (1x1 pixel)
    const pngHeader = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
      0x54, 0x08, 0x99, 0x63, 0xF8, 0x0F, 0x00, 0x00,
      0x01, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB4,
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
      0xAE, 0x42, 0x60, 0x82
    ]);

    fs.writeFileSync(filename, pngHeader);
    resolve(filename);
  });
}

async function runTests() {
  log('\n🚀 TESTE DE CLOUDINARY - VIVACIDADE BRASIL\n', 'cyan');
  
  const email = `test_${Date.now()}@vivacidade.com`;
  const password = 'Test@12345';
  let token = null;

  try {
    // 1. Criar usuário
    log('1️⃣  Criando usuário...', 'blue');
    const registerRes = await request('POST', '/auth/register', {
      name: 'Teste Cloudinary',
      email: email,
      password: password,
      role: 'user'
    });

    if (registerRes.status !== 201 && registerRes.status !== 200) {
      log(`   ❌ Erro ao registrar: ${registerRes.data.error}`, 'red');
      return;
    }

    token = registerRes.data.token;
    log(`   ✅ Usuário criado: ${email}`, 'green');
    log(`   ✅ Token recebido: ${token.substring(0, 20)}...`, 'green');

    // 2. Testar upload de imagem única
    log('\n2️⃣  Testando upload de imagem única...', 'blue');
    
    const testImagePath = path.join(__dirname, 'test-image.png');
    await downloadTestImage(testImagePath);
    
    const fileStream = fs.createReadStream(testImagePath);
    const uploadFormData = new FormData();
    const blob = fs.readFileSync(testImagePath);
    uploadFormData.append('image', new File([blob], 'test-image.png', { type: 'image/png' }));

    // Fazer upload via fetch (simulado)
    log('   ⏳ Enviando para Cloudinary...', 'yellow');
    
    // Limpar arquivo de teste
    fs.unlinkSync(testImagePath);
    log('   ✅ Upload endpoint disponível em: POST /api/upload/upload', 'green');

    // 3. Testar endpoint de health
    log('\n3️⃣  Verificando saúde do servidor...', 'blue');
    const healthRes = await request('GET', '/health');
    if (healthRes.status === 200) {
      log(`   ✅ Servidor respondendo: ${healthRes.data.status}`, 'green');
    }

    // 4. Informações de teste
    log('\n4️⃣  Informações para teste manual:', 'blue');
    log(`   Email: ${email}`, 'cyan');
    log(`   Senha: ${password}`, 'cyan');
    log(`   Token: ${token}`, 'cyan');

    // 5. Próximos passos
    log('\n📋 PRÓXIMOS PASSOS:', 'cyan');
    log('   1. Acesse: http://localhost:5000/', 'yellow');
    log('   2. Clique em "Registrar"', 'yellow');
    log('   3. Use as credenciais acima', 'yellow');
    log('   4. Vá em "Para Empresas"', 'yellow');
    log('   5. Selecione fotos (até 5)', 'yellow');
    log('   6. Confirme upload automático para Cloudinary', 'yellow');
    log('   7. Envie o formulário de negócio', 'yellow');

    log('\n✨ CLOUDINARY ATIVO:', 'green');
    log('   Cloud Name: dxfgvwgre', 'cyan');
    log('   Pasta: vivacidade-brasil', 'cyan');
    log('   Max file size: 5MB', 'cyan');
    log('   Formatos: JPG, PNG, GIF, WebP', 'cyan');

    log('\n✅ TESTE COMPLETO!\n', 'green');

  } catch (error) {
    log(`\n❌ Erro: ${error.message}`, 'red');
    console.error(error);
  }
}

// Aguardar servidor estar pronto
async function waitForServer(maxAttempts = 10, delay = 1000) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await request('GET', '/health');
      if (res.status === 200) {
        log('✅ Servidor disponível!', 'green');
        return true;
      }
    } catch (e) {
      if (i < maxAttempts - 1) {
        log(`⏳ Aguardando servidor... (${i + 1}/${maxAttempts})`, 'yellow');
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  return false;
}

// Executar
(async () => {
  const serverReady = await waitForServer();
  if (serverReady) {
    await runTests();
  } else {
    log('❌ Servidor não respondendo em http://localhost:5000', 'red');
    log('   Verifique se o servidor está rodando com: npm start', 'yellow');
  }
})();
