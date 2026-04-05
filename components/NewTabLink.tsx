import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

export type NewTabLinkProps = Omit<LinkProps, "target" | "rel"> & {
  children?: ReactNode | ReactNode[];
};

export const NewTabLink = ({ children, ...props }: NewTabLinkProps) => (
  <Link {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </Link>
);
