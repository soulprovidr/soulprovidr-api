import { Module } from '@nestjs/common';
import { SpotifyModule } from '../spotify/spotify.module';
import { PlaylistsController } from './playlists.controller';

@Module({
  controllers: [PlaylistsController],
  imports: [SpotifyModule],
})
export class PlaylistsModule {}
