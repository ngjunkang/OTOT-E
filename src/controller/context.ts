import Redis from "ioredis";

export type Context = {
  redis: Redis;
};
