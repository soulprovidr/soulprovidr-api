import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

interface Environment {
  NODE_ENV: NodeEnv;
  PORT: number;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
}

function appConfig(): ConfigModuleOptions {
  return {
    ignoreEnvFile: true,
    validationSchema: Joi.object({
      SPOTIFY_CLIENT_ID: Joi.string().required(),
      SPOTIFY_CLIENT_SECRET: Joi.string().required(),
    }),
  };
}

export { Environment, NodeEnv, appConfig };
