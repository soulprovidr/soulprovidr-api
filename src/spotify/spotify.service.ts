import { Injectable } from '@nestjs/common';
import {
  ISpotifyPaginationParams,
  ISpotifyTokenResponse,
  ISpotifyUserPlaylistsResponse,
} from './spotify.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyService {
  private accessToken: string;
  private _expiresAt: Date;

  get expiresAt(): Date {
    return this._expiresAt;
  }

  set expiresAt(expiresIn: ISpotifyTokenResponse['expires_in']) {
    this._expiresAt = new Date(Date.now() + expiresIn * 1000);
  }

  constructor(private configService: ConfigService) {}

  /** Create an authorized request to the Spotify API. */
  private createAuthorizedRequest = async <T>(
    path: string,
    searchParams: Record<string, any> = {},
    options: RequestInit = {},
  ): Promise<() => Promise<T>> => {
    const url = new URL(`https://api.spotify.com/v1${path}`);
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.append(key, value);
    }

    if (!this.accessToken || Date.now() > this.expiresAt.getTime()) {
      const { access_token: accessToken, expires_in: expiresIn } =
        await this.authorize();
      this.accessToken = accessToken;
      this.expiresAt = expiresIn;
    }

    const headers = Object.assign(
      { Authorization: `Bearer ${this.accessToken}` },
      options.headers,
    );

    return async () => {
      const res = await fetch(url, Object.assign({ headers }, options));
      if (res.ok) {
        return (await res.json()) as T;
      } else {
        throw new Error(`Status: ${res.status} ${await res.text()}`);
      }
    };
  };

  /** Obtains an access token that can be used to access the Spotify API. */
  async authorize(): Promise<ISpotifyTokenResponse> {
    try {
      const SPOTIFY_CLIENT_ID =
        this.configService.get<string>('SPOTIFY_CLIENT_ID');
      const SPOTIFY_CLIENT_SECRET = this.configService.get<string>(
        'SPOTIFY_CLIENT_SECRET',
      );
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return (await res.json()) as ISpotifyTokenResponse;
    } catch (e) {
      throw e;
    }
  }

  async getUserPlaylists(
    username: string,
    params: ISpotifyPaginationParams = { limit: 50, offset: 0 },
  ): Promise<ISpotifyUserPlaylistsResponse> {
    const userPlaylistsRequest =
      await this.createAuthorizedRequest<ISpotifyUserPlaylistsResponse>(
        `/users/${username}/playlists`,
        params,
      );
    return userPlaylistsRequest();
  }
}
