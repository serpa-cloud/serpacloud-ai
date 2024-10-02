# Etapa 1: Compilar la aplicación React
FROM node:18-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN yarn

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación
RUN yarn build

# Etapa 2: Configurar Nginx para servir la aplicación
FROM nginx:stable-alpine

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos generados en el paso anterior a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 para el contenedor
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
