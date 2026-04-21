import Image, { type ImageProps } from "next/image";

function asInt(
  v: ImageProps["width"] | ImageProps["height"] | undefined,
): number | undefined {
  if (v == null) return undefined;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) ? n : undefined;
}

/** `*-{w}x{h}.ext` in the path (e.g. cover-2400x2800.png). */
function intrinsicPxFromSrc(src: string): { w: number; h: number } | null {
  const m = /-(\d+)x(\d+)\.[^.]+$/i.exec(src);
  if (!m) return null;
  const w = Number(m[1]);
  const h = Number(m[2]);
  return Number.isFinite(w) && Number.isFinite(h) ? { w, h } : null;
}

const MDX_IMAGE_MAX_WIDTH = 600;

/**
 * `next/image` for MDX bodies. Unlike {@link CaptionedImage}, this normalizes
 * dimensions: MDX may pass string sizes or omit them; string `src` can use a
 * `*-WxH.ext` filename as a fallback for intrinsic aspect ratio.
 */
export function NextImage(props: ImageProps) {
  if (typeof props.src !== "string") {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image {...props} />;
  }

  let w = asInt(props.width);
  let h = asInt(props.height);
  const intrinsic = intrinsicPxFromSrc(props.src);

  if (intrinsic) {
    if (w === undefined && h === undefined) {
      w = Math.min(MDX_IMAGE_MAX_WIDTH, intrinsic.w);
      h = Math.round((w * intrinsic.h) / intrinsic.w);
    } else if (w === undefined && h !== undefined) {
      w = Math.round((h * intrinsic.w) / intrinsic.h);
    } else if (h === undefined && w !== undefined) {
      h = Math.round((w * intrinsic.h) / intrinsic.w);
    }
  }

  if (w === undefined || h === undefined) {
    throw new Error(
      `MDX <Image> needs width and height for ${props.src} (or a *-WxH.(ext) filename).`,
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width={w} height={h} />;
}
