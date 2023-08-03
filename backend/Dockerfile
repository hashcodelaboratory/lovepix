# Base imagee
FROM node:16 as build

RUN mkdir -p /app
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install yarn
RUN npm install yarn -g --force

# Install app dependencies
RUN yarn install --network-timeout 100000
RUN npx prisma generate

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

EXPOSE 4000

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]