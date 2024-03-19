import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SpotifyService } from '../spotify/spotify.service';
import { SPOTIFY_USERNAME } from './playlists.constants';
import { isVerifiedPlaylist } from './playlists.helpers';
import { Playlist } from './playlists.types';

@Controller('playlists')
export class PlaylistsController {
  constructor(private spotifyService: SpotifyService) {}

  @Get()
  async getPlaylists(): Promise<Playlist[]> {
    try {
      const res = await this.spotifyService.getUserPlaylists(SPOTIFY_USERNAME);
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
