@echo off
REM Script para iniciar VivaCidade Brasil localmente

echo.
echo ========================================
echo  VivaCidade Brasil - Inicialização Local
echo ========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não está instalado!
    echo Baixe em: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js encontrado: 
node --version

REM Verificar MongoDB
echo.
echo Verificando MongoDB...
curl -s http://localhost:27017 >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MongoDB não está rodando localmente
    echo Use MongoDB Atlas (Cloud) em: https://www.mongodb.com/cloud/atlas
    echo.
) else (
    echo ✅ MongoDB está rodando
)

REM Instalar dependências backend
echo.
echo Instalando dependências backend...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências backend
    pause
    exit /b 1
)

REM Verificar .env
if not exist .env (
    echo.
    echo ❌ Arquivo .env não encontrado!
    echo Copie .env.example para .env e preencha as variáveis
    echo.
    copy .env.example .env
    echo 📝 Arquivo .env criado. Edite com suas credenciais Stripe e MongoDB.
    pause
    exit /b 1
)

echo ✅ Arquivo .env encontrado

REM Iniciar backend em nova janela
echo.
echo Iniciando backend na porta 5000...
start "VivaCidade - Backend" cmd /k npm start

REM Esperar o backend iniciar
timeout /t 3

cd ..

REM Instruções para frontend
echo.
echo ========================================
echo  ✅ Tudo pronto!
echo ========================================
echo.
echo 📍 Backend: http://localhost:5000
echo 📍 Frontend: http://localhost:3000
echo.
echo Para iniciar o frontend, abra um novo terminal e execute:
echo.
echo   python -m http.server 3000
echo   ou
echo   http-server -p 3000
echo.
echo 🔍 URLs para testar:
echo   - Home: http://localhost:3000
echo   - Planos: http://localhost:3000/plans.html
echo   - Cadastro Empresa: http://localhost:3000/register-business.html
echo.
echo 🧪 Credenciais de Teste:
echo   Email: admin@vivacidade.com
echo   Senha: Admin@123
echo.
echo 💳 Cartões Stripe para Teste:
echo   Número: 4242 4242 4242 4242
echo   MM/AA: 12/25 (ou qualquer data futura)
echo   CVC: 123
echo.
echo ⏹️  Para encerrar, feche as janelas dos terminais.
echo.
pause
