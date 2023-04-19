import { type NextPage } from "next";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import { groupBy } from "lodash";

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

  console.log({ groupedIntakes });

  return (
    <div className="flex items-center justify-center bg-orange-300">
      <div className="flex max-w-[900px] flex-wrap justify-center gap-5 bg-green-400 pt-7">
        {fetchedIntakes.map((intake) => {
          return (
            <div
              key={intake.id}
              className="rounded-md border-2 border-cyan-700 bg-blue-300 p-3 shadow-md"
            >
              <div>
                <span>{dayjs(intake.intakeAt).format("HH:mm DD.MM.YYYY")}</span>
              </div>

              <span>{intake.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeIntake;
