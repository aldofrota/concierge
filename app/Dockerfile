# Estágio de construção
FROM node:18 AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do projeto para o diretório de trabalho
COPY . .

# Instala as dependências
RUN npm install
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos de construção para o diretório de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar o arquivo .env e o script do shell no contêiner
WORKDIR /usr/share/nginx/html
COPY ./env.prod.sh .
COPY .env .

# Configura o Nginx
RUN rm /etc/nginx/conf.d/default.conf
RUN echo "server {" >> /etc/nginx/conf.d/default.conf
RUN echo "    listen 8080;" >> /etc/nginx/conf.d/default.conf
RUN echo "    server_name localhost;" >> /etc/nginx/conf.d/default.conf
RUN echo "    location / {" >> /etc/nginx/conf.d/default.conf
RUN echo "        root /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf
RUN echo "        index index.html;" >> /etc/nginx/conf.d/default.conf
RUN echo "        try_files \$uri \$uri/ /index.html;" >> /etc/nginx/conf.d/default.conf
RUN echo "    }" >> /etc/nginx/conf.d/default.conf
RUN echo "}" >> /etc/nginx/conf.d/default.conf

# Expõe a porta 80 para o mundo exterior
EXPOSE 8080

# Adicionar o bash
RUN apk add --no-cache bash

# Tornar nosso script do shell executável
RUN chmod +x env.prod.sh

# Comando de inicialização do Nginx
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.prod.sh && nginx -g \"daemon off;\""]
