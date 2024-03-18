export interface IPlaylist {
  id: string;
  description: string;
  externalUrls: {
    spotify: string;
  };
  imageUrl: string;
  name: string;
  numTracks: number;
  verified: boolean;
}
