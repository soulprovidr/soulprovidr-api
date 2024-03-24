import { Module } from '@nestjs/common';
import { SpotifyModule } from '../spotify/spotify.module';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  controllers: [PlaylistsController],
  imports: [SpotifyModule],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
