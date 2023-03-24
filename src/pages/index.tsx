import { type NextPage } from "next";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const greeting = t("home:greeting");
  const title = t("common:title");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Create your secret santa party" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{greeting}</div>
      </main>
    </>
  );
};

export default Home;
