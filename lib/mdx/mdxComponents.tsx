import { CaptionedImage } from "@components/blog/Captioned";
import {
  SpotifyPlaylistEmbed,
  SpotifyTrackEmbed,
} from "@components/blog/SpotifyEmbed";

/**
 * Default MDX components for site content (`compileMdx`). Heading overrides are
 * merged in {@link compileMdx} when `bodyHeadings` is passed.
 *
 * Low-level iframe rendering stays internal to `SpotifyEmbed.tsx`; MDX only
 * exposes the typed helpers.
 */
export const mdxComponents = {
  CaptionedImage,
  SpotifyPlaylistEmbed,
  SpotifyTrackEmbed,
};
