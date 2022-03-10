# README #

This README document contains an overview of this project and the steps necessary to get it up and running locally. See deployment for notes on how to deploy the project on a live system.

### What is this repository for? ###

This repo is the backend for an ecommerce jewellery site 

### Built With

- [node](https://github.com/nodejs/node)
- [typescript](https://github.com/microsoft/TypeScript)
- [express](https://github.com/expressjs/express)
- [graphql](https://github.com/graphql)
- [apollo-server](https://github.com/apollographql/apollo-server)
- [typeorm](https://github.com/typeorm/typeorm)
- [nodemailer](https://github.com/nodemailer/nodemailer)

#### Prerequisites

What things you need to install the software and how to install them

- [nvm](https://github.com/nvm-sh/nvm#install--update-script)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [homebrew](https://brew.sh/)
- [redis](https://formulae.brew.sh/formula/redis#default)
- [postgres](https://formulae.brew.sh/formula/postgresql)
- [sequelpro](https://www.sequelpro.com/) or alternative PostgreSQL Client

#### Installing

```sh
cp .env.example .env # make a new env file
yarn # install dependencies
createdb indicode # create postgres db
npx ts-node --transpile-only ./node_modules/typeorm/cli.js migration:run #run migrations
yarn watch # compile ts to js
yarn dev # auto restart server when changes are made
```