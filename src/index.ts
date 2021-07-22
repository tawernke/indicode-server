import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import { OrderResolver } from "./resolvers/order";
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Product, Order, OrderItem],
  });

  //Uncomment the below if changes are made to the DB
  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1)
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 2, //2 hours
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, //cookie only works in https
        domain: __prod__ ? ".flurjewellery.co.uk" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver, OrderResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`🚀 Server started on port:${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error('Error: ', err);
});
