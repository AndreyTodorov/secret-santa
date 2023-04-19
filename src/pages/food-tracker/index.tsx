import { type NextPage } from "next";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import { groupBy } from "lodash";
import { log } from "console";
dayjs.extend(duration);
dayjs.extend(isToday);

const HomeIntake: NextPage = () => {
  const {
    data: fetchedIntakes,
    error,
    isLoading,
  } = api.intake.getWeeklyIntakes.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!fetchedIntakes) return <div>You have no intakes</div>;

  const groupedIntakes = groupBy(fetchedIntakes, (intake) => {
    return intake.intakeAt.toISOString().split("T")[0];
  });

  return (
    <div className="flex items-center justify-center">
      {/* // TODO: add intake button */}
      <div className="flex max-w-7xl flex-col flex-wrap justify-center gap-5 pt-7">
        {Object.entries(groupedIntakes).map(([date, intakes], i) => {
          const firstIntakeHour = dayjs(intakes[intakes.length - 1]?.intakeAt);
          const lastIntakeHour = dayjs(intakes[0]?.intakeAt);
          const currentDate = dayjs(date);

          const windowDiff = dayjs
            .duration(lastIntakeHour.diff(firstIntakeHour))
            .format("HH:mm");

          // TODO: add edit button

          //TODO: TEXT to expand or show popup on hovers

          // TODO: replace source with icons
          return (
            <div
              key={`${i}-${date}`}
              className="flex flex-col rounded-md border-2 border-blue-700 bg-teal-300 shadow"
            >
              <div className="flex gap-6 pl-4 pt-4">
                <span className="text-lg ">{date}</span>
                <span className="text-xl ">Window: {windowDiff}</span>
                {currentDate.isToday() && (
                  <span className="text-xl ">
                    From start:{" "}
                    {dayjs
                      .duration(dayjs().diff(firstIntakeHour))
                      .format("HH:mm")}
                  </span>
                )}
              </div>

              <div className="flex gap-2 p-2">
                {intakes
                  .sort((a, b) => a.intakeAt.getTime() - b.intakeAt.getTime())
                  .map((intake) => {
                    return (
                      <div
                        key={intake.id}
                        className="flex min-h-[150px] min-w-[200px] flex-col flex-wrap justify-between rounded-md border-2 border-cyan-700 bg-blue-200 p-2 shadow-md shadow-indigo-500/50 transition hover:scale-[103%]"
                      >
                        <div className="pb-1 text-center">
                          <span className="text-lg font-bold">
                            {dayjs(intake.intakeAt).format("HH:mm")}
                          </span>
                        </div>

                        <span>{intake.description}</span>

                        <div>
                          <div className="flex justify-between pt-3">
                            <span>{intake.amount}</span>
                            <span>{intake.requestSource}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeIntake;
