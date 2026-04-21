import { CaptionedImage } from "@components/blog/Captioned";
import {
  SpotifyPlaylistEmbed,
  SpotifyTrackEmbed,
} from "@components/blog/SpotifyEmbed";
import { NextImage } from "./NextImage";

/**
 * Default MDX components for site content (`compileMdx`). Heading overrides are
 * merged in {@link compileMdx} when `bodyHeadings` is passed.
 *
 * Low-level iframe rendering stays internal to `SpotifyEmbed.tsx`; MDX only
 * exposes the typed helpers.
 */
export const mdxComponents = {
  Image: NextImage,
  CaptionedImage,
  SpotifyPlaylistEmbed,
  SpotifyTrackEmbed,
};
