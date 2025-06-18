# Dockerfile
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package.json yarn.lock* ./

# Instala as dependências do projeto
RUN npm install --production --frozen-lockfile # Use yarn install --frozen-lockfile --production se estiver usando yarn

# Copia todo o código da aplicação
COPY . .

# Builda o Strapi (necessário para produção)
RUN npm run build # ou yarn build

# Expose a porta que o Strapi usa
EXPOSE 1337

# Comando para iniciar o Strapi em produção
CMD ["npm", "run", "start"] # ou ["yarn", "run", "start"]