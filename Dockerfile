# ==========================================
# STAGE 1: Build (Node.js)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (memanfaatkan layer caching)
COPY package*.json ./
RUN npm install

# Copy source code & build
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Serve (Nginx)
# ==========================================
FROM nginx:alpine

# Menyalin hasil build dari STAGE 1 ke direktori Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Menyalin konfigurasi nginx kustom jika diperlukan (opsional, bisa ditambahkan nanti)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
