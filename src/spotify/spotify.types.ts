export interface ISpotifyImageObject {
  url: string;
  height: number;
  width: number;
}

export interface ISpotifyPaginationParams {
  limit: number;
  offset: number;
}

export interface ISpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ISpotifyImageObject[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string | null;
  };
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface ISpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ISpotifyUserPlaylistsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: ISpotifyPlaylist[];
}
