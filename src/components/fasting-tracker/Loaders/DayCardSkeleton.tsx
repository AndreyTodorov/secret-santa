export const DayCardSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <div className="flex w-full flex-col justify-center gap-5 pt-7 md:max-w-3xl">
        {[...Array(count).keys()].map((i) => {
          return (
            <div
              key={i}
              className="flex h-80 animate-pulse flex-col border border-gray-700 bg-gray-400 shadow shadow-gray-500/50"
              style={{
                animationDelay: `{${i * 0.05}}s`,
                animationDuration: "1s",
              }}
            >
              <div className="mt-16 inline-block gap-6 bg-slate-400 p-3 text-center">
                <div className="inline-block h-16 w-full bg-gray-500 p-2"></div>
                <div className="inline-block h-16 w-full bg-gray-500 p-2"></div>
                <div className="inline-block h-16 w-full bg-gray-500 p-2"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
