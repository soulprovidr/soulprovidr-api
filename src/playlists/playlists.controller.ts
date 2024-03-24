import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './playlists.types';

@Controller('playlists')
export class PlaylistsController {
  constructor(private playlistService: PlaylistsService) {}

  @Get()
  async getPlaylists(): Promise<Playlist[]> {
    try {
      return await this.playlistService.getPlaylists();
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Failed to fetch playlists',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
