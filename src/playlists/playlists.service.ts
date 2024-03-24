import { Injectable } from '@nestjs/common';
import { SpotifyService } from 'src/spotify/spotify.service';
import { SPOTIFY_USERNAME } from './playlists.constants';
import { buildPlaylistFromSpotifyPlaylist } from './playlists.helpers';
import { Playlist } from './playlists.types';

@Injectable()
export class PlaylistsService {
  constructor(private spotifyService: SpotifyService) {}

  async getPlaylists(): Promise<Playlist[]> {
    const [spotifyUserPlaylistsResponse] = await Promise.all([
      this.spotifyService.getUserPlaylists(SPOTIFY_USERNAME),
    ]);
    return [
      spotifyUserPlaylistsResponse.items.map(buildPlaylistFromSpotifyPlaylist),
    ].flatMap((playlist) => playlist);
  }
}
