import { signIn, signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const TopNavbar = () => {
  const { t } = useTranslation();
  const projectName = t("common:title");
  const parties = t("home:nav-bar.parties");
  const signInText = t("home:nav-bar.signIn");
  const signOutText = t("home:nav-bar.signOut");

  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn-ghost btn text-xl normal-case" href="/">
          {projectName}
        </Link>
      </div>
      <div className="flex-none">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="btn-ghost btn normal-case" href="/parties">
                {parties}
              </Link>
            </li>
            <li tabIndex={0}>
              <a>
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="bg-base-100 p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              {session ? (
                <button
                  className="btn-ghost btn"
                  onClick={() => void signOut()}
                >
                  {signOutText}
                </button>
              ) : (
                <button onClick={() => void signIn()}>{signInText}</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
