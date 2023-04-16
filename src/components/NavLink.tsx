import { useRouter } from "next/router";
import Link, { type LinkProps } from "next/link";
import React, { useState, useEffect, type ReactElement } from "react";

type NavLinkProps = LinkProps & {
  children: ReactElement | ((isActive: boolean) => ReactElement);
};

const NavLink = ({ children, ...props }: NavLinkProps) => {
  const { asPath, isReady } = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      if (linkPathname === activePathname) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [asPath, isReady, props.as, props.href]);

  if (typeof children === "function") {
    return <Link {...props}>{children(isActive)}</Link>;
  }
  return <Link {...props}>{children}</Link>;
};

export default NavLink;
