import {
  ISpotifyPaginationParams,
  ISpotifyUserPlaylistsResponse,
  Spotify,
} from '@lib/spotify';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  private _spotify: Spotify;

  constructor(private configService: ConfigService) {
    this._spotify = new Spotify(
      this.configService.get('SPOTIFY_CLIENT_ID'),
      this.configService.get('SPOTIFY_CLIENT_SECRET'),
    );
  }

  async getUserPlaylists(
    username: string,
    params: ISpotifyPaginationParams = { limit: 50, offset: 0 },
  ): Promise<ISpotifyUserPlaylistsResponse> {
    return this._spotify.getUserPlaylists(username, params);
  }
}
