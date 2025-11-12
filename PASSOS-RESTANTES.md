# ✅ Passos Restantes para Deploy

## ✅ O que você já tem:
- Artifact Registry (`trajetoria` em `us-central1`)
- Service account do GitHub Actions com permissões de admin

## 📋 O que fazer agora:

### 1. Criar Secret OPENAI_API_KEY no Secret Manager
- **Console Google Cloud**: Secret Manager > Criar secret
- **Nome**: `OPENAI_API_KEY`
- **Valor**: Cole sua chave da OpenAI
- **Criar**

---

### 2. Configurar Secrets no GitHub
- **GitHub**: Settings > Secrets and variables > Actions
- **New repository secret**:
  - Name: `GCP_PROJECT_ID`
  - Value: `chapadevs-468722`
- **New repository secret**:
  - Name: `GCP_SA_KEY`
  - Value: Conteúdo completo do arquivo `chapadevs-468722-e8777b042699.json`

---

### 3. Fazer Primeiro Deploy do Backend
- **GitHub**: Actions > "Deploy Backend to Google Cloud Run" > Run workflow
- **Aguarde** a execução completa
- **Anote** a URL do backend nos logs (exemplo: `https://trajetoria-backend-xxxxx-uc.a.run.app`)

---

### 4. Configurar Permissão do Secret (Após Deploy)
- **Console Google Cloud**: Cloud Run > `trajetoria-backend` > Aba **Segurança**
- **Anote** o Service account usado (exemplo: `trajetoria-backend@chapadevs-468722.iam.gserviceaccount.com`)
- **Secret Manager**: `OPENAI_API_KEY` > Aba **Permissões** > Adicionar principal
- **Principal**: Cole o service account do Cloud Run
- **Função**: Secret Manager Secret Accessor
- **Salvar**

---

### 5. Configurar Frontend com URL do Backend
- **GitHub**: Settings > Secrets and variables > Actions > Aba **Variables**
- **New repository variable**:
  - Name: `BACKEND_URL`
  - Value: URL do backend (do passo 3)
- **Fazer novo deploy do frontend**: Push para main ou executar workflow manualmente

---

## 🎯 Ordem de Execução:

1. ✅ Criar secret `OPENAI_API_KEY`
2. ✅ Configurar secrets no GitHub
3. ✅ Deploy do backend
4. ✅ Configurar permissão do secret
5. ✅ Configurar variável `BACKEND_URL` e deploy do frontend

---

## ⚠️ Se algo der errado:

- **Erro "Secret not found"**: Verifique se o secret `OPENAI_API_KEY` foi criado (passo 1)
- **Erro "Permission denied"**: Verifique se a service account tem permissão para acessar o secret (passo 4)
- **Erro "Invalid credentials"**: Verifique se os secrets do GitHub estão corretos (passo 2)

