import type { NextPage } from "next";
import { useRouter } from "next/router";

const Custom404: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-slate-200">Page Not Found</h1>
      <button className="btn-link btn" onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
};

export default Custom404;
