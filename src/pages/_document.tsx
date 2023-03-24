import { Html, Head, Main, NextScript } from "next/document";
import useTranslation from "next-translate/useTranslation";

export default function Document() {
  const { lang } = useTranslation();

  return (
    <Html data-theme="coffee" lang={lang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
