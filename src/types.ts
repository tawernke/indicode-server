import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response, Express } from "express";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Express.Session }; //& sign in TS just joins to types together. Needed here because session is possibly undefined
  res: Response;
};
