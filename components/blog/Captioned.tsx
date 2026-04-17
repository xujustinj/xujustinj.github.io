type CaptionedImageProps = {
  src: string;
  alt: string;
  caption: string;
};

/** Centered image + caption. */
export function CaptionedImage({ src, alt, caption }: CaptionedImageProps) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
