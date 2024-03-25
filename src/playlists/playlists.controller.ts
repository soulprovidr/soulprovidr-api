import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { Playlist } from './interfaces/playlist.interface';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
@UseInterceptors(CacheInterceptor)
export class PlaylistsController {
  private readonly logger = new Logger(PlaylistsController.name);

  constructor(private playlistService: PlaylistsService) {}

  @Get()
  async getPlaylists(): Promise<Playlist[]> {
    try {
      return await this.playlistService.getPlaylists();
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Failed to fetch playlists',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
