import { type NextPage } from "next";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import { groupBy } from "lodash";
import { Modal } from "@/components/food-intake/Modal";
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
    <div className="flex flex-col items-center justify-center p-2 ">
      <Modal buttonName="Add new" title="Add new Intake" />
      <div className="flex w-full flex-col justify-center gap-5 pt-7 md:max-w-3xl">
        {Object.entries(groupedIntakes).map(([date, intakes], i) => {
          const firstIntakeHour = dayjs(intakes[intakes.length - 1]?.intakeAt);
          const lastIntakeHour = dayjs(intakes[0]?.intakeAt);
          const currentDate = dayjs(date);

          const windowDiff = dayjs
            .duration(lastIntakeHour.diff(firstIntakeHour))
            .format("HH:mm");

          return (
            <div
              key={`${i}-${date}`}
              className="flex flex-col rounded-lg border-2 border-blue-700 bg-teal-300 shadow shadow-indigo-500/50"
            >
              <div className="flex items-center justify-center gap-6 p-3 text-center">
                <span className="text-lg">
                  {currentDate.format("DD.MM.YYYY")}
                </span>
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

              <div className="flex flex-col gap-2 overflow-x-auto p-2">
                {intakes
                  .sort((a, b) => a.intakeAt.getTime() - b.intakeAt.getTime())
                  .map((intake) => {
                    return (
                      <div
                        key={intake.id}
                        className="group relative flex items-center justify-between gap-5 rounded-md border-2 border-cyan-600 bg-blue-200 p-2 px-3 shadow-md shadow-indigo-500/50 transition hover:scale-[101%]"
                      >
                        <div className="absolute right-1 hidden h-fit group-hover:block">
                          <Modal buttonName="Edit" title="Edit Intake" />
                        </div>
                        <div className="pb-1 text-center">
                          <span className="pl text-lg font-bold">
                            {dayjs(intake.intakeAt).format("HH:mm")}
                          </span>
                        </div>

                        <span>{intake.description}</span>

                        <div>
                          <div className="flex flex-col justify-between">
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
