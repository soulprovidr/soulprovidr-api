import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SpotifyService } from '../spotify/spotify.service';
import { IPlaylist } from './playlists.types';
import { isVerifiedPlaylist } from './playlists.helpers';

@Controller('playlists')
export class PlaylistsController {
  constructor(private spotifyService: SpotifyService) {}

  @Get()
  async getPlaylists(): Promise<IPlaylist[]> {
    try {
      const res = await this.spotifyService.getUserPlaylists('soulprovidr');
      return res.items.map((item) => ({
        id: item.id,
        description: item.description,
        externalUrls: item.external_urls,
        imageUrl: item.images[0]?.url ?? null,
        name: item.name,
        numTracks: item.tracks.total,
        verified: isVerifiedPlaylist(item),
      }));
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Failed to fetch playlists',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
