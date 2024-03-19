import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      validationSchema: Joi.object({
        SPOTIFY_CLIENT_ID: Joi.string().required(),
        SPOTIFY_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    PlaylistsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
