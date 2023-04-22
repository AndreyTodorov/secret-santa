import { type NextPage } from "next";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import { groupBy } from "lodash";
import { Modal } from "@/components/fasting-tracker/Modal";
import { SingleDayCard } from "@/components/fasting-tracker/DayCard";
dayjs.extend(duration);
dayjs.extend(isToday);

export const TECH_FORMAT = "YYYY-MM-DD";
export const DATE_FORMAT = "DD.MM.YYYY";
export const HOUR_FORMAT = "HH:mm";
export const FORM_FORMAT = `${TECH_FORMAT}T${HOUR_FORMAT}`;

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
      </div>
    </div>
  );
};

export default HomeIntake;
