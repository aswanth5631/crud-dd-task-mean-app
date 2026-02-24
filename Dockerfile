# Build stage
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Production stage (Nginx)
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/angular-15-crud /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
