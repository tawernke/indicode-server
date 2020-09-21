import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Product } from "./entities/Product";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up()
  const product = orm.em.create(Product, { title: "First Product" });
  await orm.em.persistAndFlush(product);
  console.log("----------sql 2 ----------");
  await orm.em.nativeInsert(Product, { title: "My firsyt product 2" });
};

main();
