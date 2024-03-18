import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { SpotifyModule } from '@/spotify/spotify.module';

@Module({
  controllers: [PlaylistsController],
  imports: [SpotifyModule],
})
export class PlaylistsModule {}
