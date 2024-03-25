import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { appConfig } from './app.config';
import { AppController } from './app.controller';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    PlaylistsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
