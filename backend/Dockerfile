# Backend Dockerfile
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia package files
COPY package*.json ./

# Instala dependências
RUN npm ci --only=production

# Copia código fonte
COPY . .

# Expõe porta (Cloud Run define a porta via variável de ambiente PORT)
EXPOSE 3001

# Define variável de ambiente de produção
ENV NODE_ENV=production
# PORT será definido pelo Cloud Run automaticamente

# Comando para iniciar
CMD ["node", "server.js"]

