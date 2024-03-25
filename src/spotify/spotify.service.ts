import {
  Spotify,
  SpotifyPaginationParams,
  SpotifyUserPlaylistsResponse,
} from '@lib/spotify';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/app.config';

@Injectable()
export class SpotifyService {
  private _spotify: Spotify;

  constructor(private configService: ConfigService<Environment>) {
    this._spotify = new Spotify(
      this.configService.get<string>('SPOTIFY_CLIENT_ID'),
      this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
    );
  }

  async getUserPlaylists(
    username: string,
    params: SpotifyPaginationParams = { limit: 50, offset: 0 },
  ): Promise<SpotifyUserPlaylistsResponse> {
    return this._spotify.getUserPlaylists(username, params);
  }
}
