import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  navbar?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();
  const title = t("common:title");

  const dev = process.env.NODE_ENV === "development";
  return (
    <>
      <Head>
        <title>{dev ? `[DEV] ${title}` : title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Andrey Todorov" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon${dev ? "-dev" : ""}-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon${dev ? "-dev" : ""}-16x16.png`}
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="relative flex min-h-screen flex-col ">
        <Navbar />
        <main className="p-2">{children}</main>
      </div>

      {/* Footer, when needed */}
    </>
  );
};

export default Layout;
