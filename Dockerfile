# Usar una imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que corre la API
EXPOSE 3000

# Comando para ejecutar la API
CMD ["node", "index.js"]
