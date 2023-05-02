export const CardSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        {[...Array(count).keys()].map((i) => {
          return (
            <div
              key={i}
              className={`mt-6 h-36 w-96 animate-pulse rounded-xl border-2 border-cyan-500 bg-slate-200 p-6 text-left shadow-lg shadow-zinc-500/50 transition`}
              style={{
                animationDelay: `{${i * 0.05}}s`,
                animationDuration: "1s",
              }}
            >
              <h3 className="inline-block h-10 w-80 rounded-md bg-slate-300"></h3>
              <p className="mt-2 inline-block h-8 w-64 rounded-md bg-slate-300"></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
