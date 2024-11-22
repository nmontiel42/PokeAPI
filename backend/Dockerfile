# Dockerfile para el backend
FROM node:18

WORKDIR /app

# Copiar package.json y package-lock.json desde la carpeta backend
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos del backend
COPY ./ ./

# Exponer el puerto 4000
EXPOSE 4000

# Iniciar el servidor
CMD ["node", "server.js"]
