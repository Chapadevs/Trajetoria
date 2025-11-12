# 📥 Instruções - Botão de Download de Relatório

##  Funcionalidade
O botão de download do relatório completo aparece **automaticamente** na página inicial após você completar qualquer teste. Ele está posicionado logo após a seção de "Seus Resultados".

## 📍 Localização
Na página inicial (`/`), o botão aparece em uma seção dedicada abaixo dos seus testes completados com:
- Badge "Seus testes estão prontos!" 
- Card grande com gradiente roxo
- Botão destacado "Baixar Relatório Completo"

## ⚙️ Como Usar

### 1. **Certifique-se que o backend está rodando**
```bash
# No terminal, navegue até a pasta backend
cd backend

# Instale as dependências (primeira vez)
npm install

# Inicie o servidor backend
npm run dev
```

O backend deve iniciar na porta **3001** (http://localhost:3001)

### 2. **Execute o frontend**
```bash
# Em outro terminal, na pasta raiz do projeto
cd frontend

# Inicie o servidor frontend
npm run dev
```

O frontend deve iniciar na porta **5173** (http://localhost:5173)

### 3. **Complete pelo menos um teste**
Para que o botão apareça, você precisa ter completado pelo menos um dos testes:
- ✅ Anamnese
- ✅ Disc Insight  
- ✅ Inteligen Finder (Inteligências Múltiplas)
- ✅ RIASEC
- ✅ Arquétipos

### 4. **Clique em "Baixar Relatório Completo"**
- O botão estará visível na seção logo após "Seus Resultados"
- Ao clicar, o sistema irá:
  1. ✅ Buscar todos os dados salvos no localStorage
  2. ✅ Enviar para o backend via API (POST /api/reports/generate)
  3. ✅ Gerar um PDF completo e profissional
  4. ✅ Fazer o download automático do arquivo

## 🎨 Design
O botão utiliza as cores da marca:
- **Primária**: `#413288`
- **Secundária**: `#6152BD`
- **Terciária**: `#9266CC`
- **Clara**: `#C8A1FF`

Características visuais:
- Gradiente animado
- Ícone de download com animação
- Efeito hover com sombra
- Feedback visual durante o carregamento

## 🔧 Conexão Frontend-Backend

### Frontend → Backend
**Arquivo**: `frontend/src/services/api.js`

```javascript
// Endpoint de geração do PDF
POST http://localhost:3001/api/reports/generate

// Body enviado:
{
  "userData": { /* dados da anamnese */ },
  "tests": { /* todos os testes completados */ }
}
```

### Backend → Response
**Arquivo**: `backend/routes/reports.js`

```javascript
// Responde com um buffer PDF
Content-Type: application/pdf
Content-Disposition: attachment; filename=relatorio-completo-{timestamp}.pdf
```

## 🛠️ Configuração

### Variável de Ambiente (Frontend)
Crie um arquivo `.env` na pasta `frontend`:

```env
VITE_API_URL=http://localhost:3001
```

Se não criar, o sistema usa `http://localhost:3001` por padrão.

### CORS (Backend)
O backend já está configurado para aceitar requisições de:
- `http://localhost:5173` (Vite dev)
- `http://localhost:3000` (React dev)
- `https://Erik-Mfa.github.io` (GitHub Pages)

## 📊 Estrutura de Dados Enviada

```javascript
{
  userData: {
    nomeCompleto: "string",
    idade: "number",
    cidadeEstado: "string",
    email: "string",
    nivelEscolaridade: "string",
    areaEstudo: "string",
    situacaoProfissional: "string",
    ocupacaoAtual: "string",
    areasInteresse: ["array"],
    objetivosCarreira: ["array"]
  },
  tests: {
    "disc-insight": {
      completed: true,
      completedAt: "ISO date",
      data: { /* respostas */ },
      results: { D: 25, I: 30, S: 20, C: 25 }
    },
    "multiple-intelligences": {
      completed: true,
      completedAt: "ISO date",
      data: { /* respostas */ },
      results: { /* scores */ }
    },
    // ... outros testes
  }
}
```

## 🚨 Troubleshooting

### Botão não aparece?
✅ Verifique se completou pelo menos um teste
✅ Verifique o console do navegador (F12)
✅ Verifique o localStorage: `localStorage.getItem('completedTests')`

### Backend Offline?
Se aparecer o aviso "Backend Offline":
1. ✅ Verifique se o backend está rodando na porta 3001
2. ✅ Execute: `cd backend && npm run dev`
3. ✅ Teste o health check: http://localhost:3001/health

### Erro ao gerar PDF?
1. ✅ Verifique os logs do backend no terminal
2. ✅ Certifique-se que as dependências estão instaladas: `cd backend && npm install`
3. ✅ Verifique se o arquivo `backend/services/pdfGenerator.js` existe

### CORS Error?
Se receber erro de CORS:
1. ✅ Verifique se o frontend está rodando em uma das portas permitidas
2. ✅ Verifique o arquivo `backend/server.js` na configuração CORS

## 📝 Logs e Debug

### Verificar Health do Backend
```bash
curl http://localhost:3001/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "message": "Backend rodando!"
}
```

### Testar Rota de Relatórios
```bash
curl http://localhost:3001/api/reports/test
```

## 🎉 Pronto!
Agora você pode:
1. ✅ Completar testes
2. ✅ Ver o botão aparecer automaticamente
3. ✅ Baixar seu relatório completo em PDF
4. ✅ Compartilhar ou imprimir seus resultados

---

**Desenvolvido com** 💜 **usando as cores da marca Trajetória**




