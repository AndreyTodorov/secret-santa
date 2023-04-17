import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const Custom404: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const pageNotFound = t("common:pageNotFound");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-gray-500">{pageNotFound}</h1>
      <button className="btn-link btn" onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
};

export default Custom404;
