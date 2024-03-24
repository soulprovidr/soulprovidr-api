import {
  SpotifyPaginationParams,
  SpotifyTokenResponse,
  SpotifyUserPlaylistsResponse,
} from './types';

export class Spotify {
  private _accessToken: string;
  private _clientId: string;
  private _clientSecret: string;
  private _expiresAt: Date;

  constructor(clientId: string, clientSecret: string) {
    this._clientId = clientId;
    this._clientSecret = clientSecret;
  }

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

    if (!this._accessToken || Date.now() > this._expiresAt.getTime()) {
      const { access_token: accessToken, expires_in: expiresIn } =
        await this.authorize();
      this._accessToken = accessToken;
      this._expiresAt = new Date(Date.now() + expiresIn * 1000);
    }

    const headers = Object.assign(
      { Authorization: `Bearer ${this._accessToken}` },
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
  async authorize(): Promise<SpotifyTokenResponse> {
    try {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${this._clientId}:${this._clientSecret}`).toString(
              'base64',
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return (await res.json()) as SpotifyTokenResponse;
    } catch (e) {
      throw e;
    }
  }

  async getUserPlaylists(
    username: string,
    params: SpotifyPaginationParams = { limit: 50, offset: 0 },
  ): Promise<SpotifyUserPlaylistsResponse> {
    const userPlaylistsRequest =
      await this.createAuthorizedRequest<SpotifyUserPlaylistsResponse>(
        `/users/${username}/playlists`,
        params,
      );
    return userPlaylistsRequest();
  }
}
