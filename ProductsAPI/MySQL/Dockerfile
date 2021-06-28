FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ../../package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 4000

CMD ["npm","productsStart"]