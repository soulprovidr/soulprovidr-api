import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment, NodeEnv } from 'src/app.config';
import { SpotifyModule } from '../spotify/spotify.module';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  controllers: [PlaylistsController],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      async useFactory(configService: ConfigService<Environment>) {
        const env = configService.get<string>('NODE_ENV');
        // Cache for 1 hour in production, 5 seconds in development.
        const ttl = env === NodeEnv.PRODUCTION ? 60 * 60 * 1000 : 5;
        return { ttl };
      },
      inject: [ConfigService],
    }),
    SpotifyModule,
  ],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
