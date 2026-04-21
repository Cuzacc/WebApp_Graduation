# --- STAGE 1: Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Cài đặt dependencies
RUN npm install

# Copy mã nguồn
COPY . .

# Biên dịch dự án Next.js
RUN npm run build

# --- STAGE 2: Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

# Chỉ copy những thứ tuyệt đối cần thiết để chạy
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Mở cổng 3000 (Cổng mặc định của Next.js)
EXPOSE 3000

# Chạy ứng dụng Next.js
CMD ["npm", "run", "start"]
