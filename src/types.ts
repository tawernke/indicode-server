import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: Express.Session }; //& sign in TS just joins to types together. Needed here because session is possibly undefined
  res: Response;
  redis: Redis;
};
