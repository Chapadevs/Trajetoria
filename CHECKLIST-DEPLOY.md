# ✅ Checklist - Deploy Backend Cloud Run

## 📋 O que você já tem:
- ✅ Service Account: `github-actions-sa@chapadevs-468722.iam.gserviceaccount.com`
- ✅ Chave JSON da service account (arquivo no repositório)
- ✅ Workflow GitHub Actions configurado

## 🔍 O que precisa verificar/configurar no Console do Google Cloud:

### 1. **Verificar Permissões da Service Account**

No Console Google Cloud:
- Vá em **IAM e Admin > Contas de serviço**
- Clique em `github-actions-sa@chapadevs-468722.iam.gserviceaccount.com`
- Aba **Permissões**
- Verifique se tem as seguintes roles:
  - ✅ **Cloud Run Admin** (`roles/run.admin`)
  - ✅ **Artifact Registry Administrator** (`roles/artifactregistry.admin`)
  - ✅ **Service Account User** (`roles/iam.serviceAccountUser`)
  - ✅ **Secret Manager Secret Accessor** (`roles/secretmanager.secretAccessor`) ⚠️ **IMPORTANTE**

**Se faltar alguma permissão:**
1. No IAM e Admin > IAM, encontre a service account
2. Clique no ícone de editar (✏️)
3. Clique em **Adicionar outra função**
4. Adicione as permissões faltantes

---

### 2. **Criar Repositório Artifact Registry**

No Console Google Cloud:
- Vá em **Artifact Registry > Repositórios**
- Verifique se existe um repositório chamado `trajetoria` na região `us-central1`
- Se **NÃO existir**, clique em **Criar repositório**:
  - Nome: `trajetoria`
  - Formato: **Docker**
  - Região: `us-central1`
  - Clique em **Criar**

---

### 3. **Criar Secret OPENAI_API_KEY no Secret Manager**

No Console Google Cloud:
- Vá em **Secret Manager**
- Verifique se existe um secret chamado `OPENAI_API_KEY`
- Se **NÃO existir**, clique em **Criar secret**:
  - Nome: `OPENAI_API_KEY`
  - Valor do secret: Cole sua chave da OpenAI
  - Clique em **Criar secret**

---

### 4. **Configurar Permissões do Secret Manager**

No Console Google Cloud:
- Vá em **Secret Manager**
- Clique no secret `OPENAI_API_KEY`
- Aba **Permissões**
- Clique em **Adicionar principal**
- Principal: `trajetoria-backend@chapadevs-468722.iam.gserviceaccount.com`
  - ⚠️ **NOTA**: Se o serviço ainda não existe, você pode usar o service account padrão do Cloud Run: `[PROJECT-NUMBER]-compute@developer.gserviceaccount.com`
  - Ou adicione a permissão depois do primeiro deploy (ver passo 5)
- Função: **Secret Manager Secret Accessor** (`roles/secretmanager.secretAccessor`)
- Clique em **Salvar**

**Alternativa (mais seguro):**
- Após o primeiro deploy, o Cloud Run criará automaticamente um service account
- Você pode adicionar a permissão depois, mas precisa garantir que o serviço use esse service account

---

### 5. **Configurar Secrets no GitHub**

No GitHub:
- Vá em **Settings > Secrets and variables > Actions**
- Verifique se existem os seguintes secrets:
  - ✅ `GCP_PROJECT_ID`: deve ter o valor `chapadevs-468722`
  - ✅ `GCP_SA_KEY`: deve ter o conteúdo completo do arquivo JSON `chapadevs-468722-e8777b042699.json`

**Se não existirem:**
1. Clique em **New repository secret**
2. Name: `GCP_PROJECT_ID`
   - Value: `chapadevs-468722`
3. Clique em **New repository secret** novamente
4. Name: `GCP_SA_KEY`
   - Value: Cole o conteúdo completo do arquivo `chapadevs-468722-e8777b042699.json`

---

### 6. **Verificar APIs Habilitadas**

No Console Google Cloud:
- Vá em **APIs e Serviços > Biblioteca**
- Verifique se as seguintes APIs estão habilitadas:
  - ✅ **Cloud Run API**
  - ✅ **Artifact Registry API**
  - ✅ **Secret Manager API**
  - ✅ **Cloud Build API** (pode ser necessário para alguns recursos)

**Se alguma não estiver habilitada:**
1. Clique na API
2. Clique em **Habilitar**

---

## 🚀 Após verificar tudo acima:

### 7. **Primeiro Deploy**

No GitHub:
1. Vá em **Actions**
2. Selecione o workflow **Deploy Backend to Google Cloud Run**
3. Clique em **Run workflow**
4. Aguarde a execução completa
5. Verifique a URL do backend nos logs (exemplo: `https://trajetoria-backend-xxxxx-uc.a.run.app`)

---

### 8. **Configurar Permissões do Secret (Após Primeiro Deploy)**

Após o primeiro deploy bem-sucedido:
1. No Console Google Cloud, vá em **Cloud Run**
2. Clique no serviço `trajetoria-backend`
3. Aba **Segurança**, anote o **Service account** usado (exemplo: `trajetoria-backend@chapadevs-468722.iam.gserviceaccount.com`)
4. Vá em **Secret Manager > OPENAI_API_KEY > Permissões**
5. Adicione esse service account com a função **Secret Manager Secret Accessor**

---

### 9. **Configurar Frontend com URL do Backend**

Após obter a URL do backend do Cloud Run (exemplo: `https://trajetoria-backend-xxxxx-uc.a.run.app`):

**No GitHub:**
1. Vá em **Settings > Secrets and variables > Actions**
2. Clique na aba **Variables**
3. Clique em **New repository variable**
4. Name: `BACKEND_URL`
5. Value: Cole a URL completa do backend (exemplo: `https://trajetoria-backend-xxxxx-uc.a.run.app`)
6. Clique em **Add variable**

**O workflow do frontend já está configurado para usar essa variável:**
- O workflow do frontend (`deploy-frontend.yml`) usa `${{ vars.BACKEND_URL }}` durante o build
- Isso configura a variável `VITE_API_URL` no frontend automaticamente
- Após configurar a variável, faça um novo deploy do frontend (push para main ou execute manualmente)

---

## ⚠️ Problemas Comuns:

### Erro: "Permission denied on resource"
- **Solução**: Verifique se a service account tem todas as permissões listadas no passo 1

### Erro: "Repository not found"
- **Solução**: Verifique se o repositório `trajetoria` existe no Artifact Registry (passo 2)

### Erro: "Secret not found"
- **Solução**: Verifique se o secret `OPENAI_API_KEY` existe no Secret Manager (passo 3)

### Erro: "Access denied to secret"
- **Solução**: Verifique se o service account do Cloud Run tem permissão para acessar o secret (passo 4 ou 8)

### Erro: "Invalid credentials"
- **Solução**: Verifique se os secrets do GitHub estão configurados corretamente (passo 5)

---

## 📝 Resumo Rápido:

1. ✅ Verificar permissões da service account
2. ✅ Criar repositório Artifact Registry (`trajetoria`)
3. ✅ Criar secret `OPENAI_API_KEY` no Secret Manager
4. ✅ Configurar permissões do secret
5. ✅ Configurar secrets no GitHub (`GCP_PROJECT_ID` e `GCP_SA_KEY`)
6. ✅ Verificar APIs habilitadas
7. ✅ Executar primeiro deploy
8. ✅ Configurar permissões do secret após deploy
9. ✅ Configurar frontend com URL do backend

---

## 🎯 Próximos Passos:

Após completar todos os passos acima, você pode:
- Fazer deploy automático via GitHub Actions
- Testar o backend acessando `/health`
- Configurar o frontend para usar a URL do backend

