import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpotifyService } from './spotify.service';

@Module({
  exports: [SpotifyService],
  imports: [ConfigModule],
  providers: [SpotifyService],
})
export class SpotifyModule {}
