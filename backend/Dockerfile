# Base imagee
FROM node:16 as build

RUN mkdir -p /app
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install yarn
RUN npm install yarn -g --force
RUN npm install @prisma/client

# Install app dependencies
RUN yarn install --network-timeout 100000

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

EXPOSE 4000

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]