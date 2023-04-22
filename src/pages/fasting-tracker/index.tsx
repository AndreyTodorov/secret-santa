import { type NextPage } from "next";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import { groupBy } from "lodash";
import { Modal } from "@/components/fasting-tracker/Modal";
import { SingleDayCard } from "@/components/fasting-tracker/DayCard";
import { type IntakeEntry } from "@prisma/client";
dayjs.extend(duration);
dayjs.extend(isToday);

export const TECH_FORMAT = "YYYY-MM-DD";
export const DATE_FORMAT = "DD.MM.YYYY";
export const HOUR_FORMAT = "HH:mm";
export const FORM_FORMAT = `${TECH_FORMAT}T${HOUR_FORMAT}`;

const HomeIntake: NextPage = () => {
  const {
    data: fetchedIntakes,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = api.intake.getPaginatedIntakes.useInfiniteQuery(
    { limit: 25 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!fetchedIntakes) return <div>You have no intakes</div>;

  const allIntakes: IntakeEntry[] = [];
  fetchedIntakes?.pages.forEach(({ intakes }) => {
    allIntakes.push(...intakes);
  });

  // Group by Date
  const groupedIntakes = groupBy(allIntakes, (intake) => {
    return dayjs(intake.intakeAt).format(TECH_FORMAT);
  });

  return (
    <div className="flex flex-col items-center justify-center p-2 ">
      <Modal buttonName="Add new" title="Add new Intake" />
      <div className="flex w-full flex-col justify-center gap-5 pt-7 md:max-w-3xl">
        {Object.entries(groupedIntakes).map(([date, intakes], i) => {
          return (
            <SingleDayCard key={`${i}-${date}`} date={date} intakes={intakes} />
          );
        })}
        <div className="flex">
          {hasNextPage && (
            <button
              className="w-full rounded-md border border-transparent bg-blue-200 py-1 px-3 text-lg text-blue-900 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
              enabled:hover:bg-blue-300
              enabled:active:scale-[98%] 
              disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-70"
              type="button"
              onClick={() => fetchNextPage()}
            >
              load more...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeIntake;
