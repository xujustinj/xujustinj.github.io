"use client";

import { useEffect, useRef } from "react";

export interface EmbedProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {}

// An iframe that permanently steals focus from the page.
export const Embed = (props: EmbedProps) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const focus = () => iFrameRef.current?.focus();
  useEffect(focus, [iFrameRef]);
  return (
    <iframe
      {...props}
      ref={iFrameRef}
      onBlur={(e) => {
        focus();
        if (props.onBlur !== undefined) {
          props.onBlur(e);
        }
      }}
    ></iframe>
  );
};
