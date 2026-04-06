"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { usePathname, useServerInsertedHTML } from "next/navigation";
import { type ReactNode, useState } from "react";
import {
  ServerStyleSheet,
  StyleSheetManager,
  createGlobalStyle,
} from "styled-components";
import { Colour } from "../styles/Colours";
import { Footer } from "./Footer";
import NavBar from "./NavBar";

config.autoAddCss = false;

const GlobalStyle = createGlobalStyle`
* {
  font-family: var(--font-ibm-plex-sans), sans-serif;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}

/* Sidenotes section heading from GFM (remark-gfm emits class="sr-only"). */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;

/** Map URL pathname → centre title in the nav bar (empty on home). */
const NAV_TITLE_BY_PATH: Record<string, string> = {
  "/": "",
  "/hexagonal-2048": "Hexagonal 2048",
};

function resolveNavTitle(pathname: string): string {
  if (pathname in NAV_TITLE_BY_PATH) {
    return NAV_TITLE_BY_PATH[pathname as keyof typeof NAV_TITLE_BY_PATH];
  }
  if (pathname === "/blog") {
    return "Blog";
  }
  if (pathname.startsWith("/blog/")) {
    return "Blog";
  }
  return "";
}

/**
 * Client shell for `app/layout.tsx`: styled-components SSR registry, global
 * styles, nav, footer.
 *
 * @see https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
 */
export function Layout({ children }: { children: ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  const pathname = usePathname();
  const title = pathname !== null ? resolveNavTitle(pathname) : "";

  const shell = (
    <>
      <GlobalStyle />
      <NavBar title={title} />
      {children}
      <Footer
        $background={Colour({ h: "blue", s: "faded", v: "darker" })}
        $foreground="white"
      />
    </>
  );

  if (typeof window !== "undefined") {
    return shell;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {shell}
    </StyleSheetManager>
  );
}
