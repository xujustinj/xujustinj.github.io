import styled from "styled-components";

const Wrapper = styled.div<{ $height: number }>`
  margin: 0 0 1em 0;
  max-width: 100%;

  iframe {
    display: block;
    border: 0;
    width: 100%;
    height: ${(p) => p.$height}px;
    border-radius: 12px;
  }
`;

type SpotifyEmbedProps = {
  /** Full Spotify embed URL, e.g. `https://open.spotify.com/embed/track/…` */
  src: string;
  /** Accessible label for the iframe (defaults to "Spotify embed"). */
  title: string;
  /** Iframe height. */
  height: 152 | 352;
};

const DEFAULT_HEIGHT = 352;

function SpotifyEmbed({
  src,
  title,
  height = DEFAULT_HEIGHT,
}: SpotifyEmbedProps) {
  return (
    <Wrapper className="spotify-embed" $height={height}>
      <iframe
        src={src}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </Wrapper>
  );
}

export type SpotifyTrackEmbedProps = {
  id: string;
  artist: string | string[];
  title: string;
}

export function SpotifyTrackEmbed({
  id,
  title,
  artist,
}: SpotifyTrackEmbedProps) {
  const artistNames = Array.isArray(artist) ? artist.join(", ") : artist;
  return <SpotifyEmbed src={`https://open.spotify.com/embed/track/${id}`} title={`${artistNames} – ${title}`} height={152} />;
}

export type SpotifyPlaylistEmbedProps = {
  id: string;
  title: string;
}

export function SpotifyPlaylistEmbed({
  id,
  title,
}: SpotifyPlaylistEmbedProps) {
  return <SpotifyEmbed src={`https://open.spotify.com/embed/playlist/${id}`} title={title} height={352} />;
}
