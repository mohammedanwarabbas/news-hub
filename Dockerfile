# Step 1: Use a Node.js base image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
# RUN npm install
RUN npm install --legacy-peer-deps

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Start the app
CMD ["npm", "start"]