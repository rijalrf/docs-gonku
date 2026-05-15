# Stage 1: Base & Dependencies
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development (with Live Reload support)
FROM base AS dev
COPY . .
# VitePress dev server default port is 5173
EXPOSE 5173
CMD ["npm", "run", "docs:dev", "--", "--host", "0.0.0.0"]

# Stage 3: Build for Production
FROM base AS builder
COPY . .
RUN npm run docs:build

# Stage 4: Production Serve (Nginx)
FROM nginx:alpine AS prod
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
