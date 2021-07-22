declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USER: string;
    MAIL_PASS: string;
  }
}
