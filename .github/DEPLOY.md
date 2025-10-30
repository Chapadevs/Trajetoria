# Guia de Deploy - GitHub Pages

## 📋 Pré-requisitos

1. Ter um repositório no GitHub
2. Ter o código commitado e pushed para o repositório

## 🚀 Configuração do GitHub Pages

Siga estes passos para ativar o GitHub Pages no seu repositório:

### 1. Acesse as configurações do repositório

- Vá para o seu repositório no GitHub
- Clique em **Settings** (Configurações)

### 2. Configure o GitHub Pages

- No menu lateral esquerdo, clique em **Pages**
- Em **Source** (Fonte), selecione:
  - **Source**: GitHub Actions

### 3. Faça o primeiro deploy

Após configurar, você tem duas opções:

**Opção A: Push para o branch main**
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

**Opção B: Executar manualmente**
- Vá para a aba **Actions** no GitHub
- Selecione o workflow "Deploy to GitHub Pages"
- Clique em **Run workflow**

### 4. Acompanhe o deploy

- Vá para a aba **Actions** no seu repositório
- Você verá o workflow sendo executado
- Quando finalizar (✓ verde), seu site estará disponível

### 5. Acesse seu site

Seu site estará disponível em:
```
https://<seu-usuario>.github.io/Imagine/
```

## 🔧 Importante

O arquivo `vite.config.js` já está configurado com:
```js
base: process.env.NODE_ENV === 'production' ? '/Imagine/' : '/'
```

**Se o nome do seu repositório NÃO for "Imagine"**, você precisa atualizar o `base` no `vite.config.js`:
```js
base: process.env.NODE_ENV === 'production' ? '/SEU-REPO-NOME/' : '/'
```

## 🔄 Deploys Automáticos

Após a configuração inicial, qualquer push para o branch `main` vai automaticamente:
1. Fazer o build da aplicação
2. Fazer deploy no GitHub Pages
3. Atualizar seu site

## ⚠️ Troubleshooting

### Erro 404 ao acessar o site
- Verifique se o nome no `base` do `vite.config.js` corresponde ao nome do repositório
- Certifique-se de que o GitHub Pages está configurado para usar "GitHub Actions" como source

### Workflow falhou
- Verifique os logs na aba Actions
- Certifique-se de que todas as dependências estão no `package.json`
- Tente rodar `npm ci && npm run build` localmente para verificar se o build funciona

### Permissões
Se você receber erros de permissão, verifique em **Settings > Actions > General**:
- Em "Workflow permissions", selecione "Read and write permissions"

