import { ISpotifyPlaylist } from '@/spotify/spotify.types';
import {
  DAILY_LISTENING_PLAYLIST_ID,
  FRESH_FRIDAYS_PLAYLIST_ID,
} from './playlists.constants';

export const isVerifiedPlaylist = (playlist: ISpotifyPlaylist) => {
  return [DAILY_LISTENING_PLAYLIST_ID, FRESH_FRIDAYS_PLAYLIST_ID].includes(
    playlist.id,
  );
};
