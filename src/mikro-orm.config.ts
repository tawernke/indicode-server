import { Product } from "./entities/Product"
import { MikroORM } from "@mikro-orm/core";
import path from "path"
import { __prod__ } from "./constants";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Product],
  dbName: "indicode",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];