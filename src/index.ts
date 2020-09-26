import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME } from "./constants";
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'indicode-db',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [User, Product]
  })

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 2, //2 hours
        httpOnly: true,
        sameSite: "lax",
        secure: false, //cookie only works in https
      },
      saveUninitialized: false,
      secret: "rdhyehdtjrtj",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("🚀 Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
