<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation of Prisma globally

```bash
$ npm install -g prisma
```

## Installation dependencies

```bash
$ yarn install

OR

$ yarn
```

## Create .env file for local development (variables are in .env.template or new-lovepix ORG slack channel in pinned message), note: need to modify DATABASE_URL - mongo_username and mongo_password too
```bash
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGODB_SERVER=
MONGODB_ENABLE_ADMIN=
MONGODB_ADMINUSERNAME=
MONGODB_ADMINPASSWORD=
BASICAUTH_USERNAME=
BASICAUTH_PASSWORD=
MONGO_REPLICA_HOST=
MONGO_REPLICA_PORT=
API_KEY=

DATABASE_URL="mongodb://<MONGO_INITDB_ROOT_USERNAME>:<MONGO_INITDB_ROOT_USERNAME>@localhost:27017/lovepix?ssl=false&serverSelectionTimeoutMS=2000&authSource=admin"
```

## Run docker-compose.yaml (docker start MongoDB instance and Mongo-Express instance) 
```bash
$ cd backend
$ docker-compose up -d      (run docker-compose yaml file)
```
### Optional Docker commands
```bash
$ docker-compose down       (exit all containers which are in docker-compose.yaml file)
$ docker ps -a              (list of docker running docker containers)
```

## Init Prisma and MongoDB in local development

```bash
# prisma init
$ prisma init

# prisma generate
$ prisma generate

# push all collections to the MongoDB
$ prisma db push
```
## Running the app (inicialization with packages)
```bash
# development (command from package.json)
$ yarn start:be

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

