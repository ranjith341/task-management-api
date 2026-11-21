# 1. Use Node.js as the base image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./

# 4. Install production dependencies
RUN npm ci --omit=dev

# 5. Copy application source code
COPY src ./src

# 6. Expose the application port
EXPOSE 3000

# 7. Start the application
CMD ["npm", "start"]