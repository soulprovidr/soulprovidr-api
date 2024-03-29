import { SpotifyPlaylist } from '@lib/spotify/types';
import { Playlist } from './interfaces/playlist.interface';
import {
  DailyListeningPlaylistId,
  FreshFridaysPlaylistId,
} from './playlists.constants';

export function buildPlaylistFromSpotifyPlaylist(
  playlist: SpotifyPlaylist,
): Playlist {
  return {
    id: `spotify:${playlist.id}`,
    description: playlist.description,
    externalUrls: playlist.external_urls,
    featured: [
      DailyListeningPlaylistId.SPOTIFY as string,
      FreshFridaysPlaylistId.SPOTIFY as string,
    ].includes(playlist.id),
    imageUrl: playlist.images[0]?.url ?? null,
    name: playlist.name,
    tracks: {
      total: playlist.tracks.total,
    },
  };
}
