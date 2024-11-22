# Dockerfile para el frontend
FROM node:18

WORKDIR /app

# Copiar package.json y package-lock.json desde la carpeta frontend
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos del frontend
COPY ./ ./

# Exponer el puerto 5174
EXPOSE 5174

# Iniciar el servidor con Vite
CMD ["npm", "run", "dev"]
