# Etapa de construcción
FROM node:latest AS build

# Crear directorio de aplicación
WORKDIR /app

# Clonar el repositorio
RUN git clone https://github.com/MKS2508/medmoderna.git .

# Instalar las dependencias del proyecto
RUN npm install -g pnpm
RUN pnpm install

# Construir la aplicación para producción
RUN pnpm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copiar los archivos de construcción del stage build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx
COPY medmoderna/nginx.conf /etc/nginx/conf.d/default.conf
COPY medmoderna/_.medicinamodernagrow.shop_private_key.key /etc/nginx/ssl/nginx.key
COPY medmoderna/medicinamodernagrow.crt /etc/nginx/ssl/nginx.crt

# Exponer el puerto 80 y 443
EXPOSE 80 443

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
LABEL authors="MKS2508"
