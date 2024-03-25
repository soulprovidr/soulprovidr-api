import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Environment } from './app.config';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Environment>);
  const logger = new Logger('bootstrap');
  const port = configService.get<number>('PORT');
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(port);
  logger.log(`Server running on port ${port}.`);
}
bootstrap();
