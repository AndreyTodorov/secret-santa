import {
  DATE_FORMAT,
  FORM_FORMAT,
  HOUR_FORMAT,
  TECH_FORMAT,
} from "@/pages/fasting-tracker";
import { type UpsertIntakeInputType } from "@/schemas/intake.schema";
import { type IntakeEntry } from "@prisma/client";
import dayjs from "dayjs";
import { SingleIntake } from "./SingleIntake";

type RawIntake = Pick<
  IntakeEntry,
  "id" | "amount" | "description" | "intakeAt" | "ownerId" | "requestSource"
>;
interface Props {
  date: string;
  intakes: RawIntake[];
  openModal: (intake: UpsertIntakeInputType | null) => void;
}

export const SingleDayCard = ({ date, intakes, openModal }: Props) => {
  const sortedIntakes = intakes.sort(
    (a, b) => a.intakeAt.getTime() - b.intakeAt.getTime()
  );
  const firstIntakeHour = dayjs(sortedIntakes[0]?.intakeAt);
  const lastIntakeHour = dayjs(
    sortedIntakes[sortedIntakes.length - 1]?.intakeAt
  );
  const currentDate = dayjs(date, TECH_FORMAT);

  const windowDiff = dayjs
    .duration(lastIntakeHour.diff(firstIntakeHour))
    .format(HOUR_FORMAT);

  return (
    <div className="flex flex-col border border-blue-700 bg-sky-300 shadow shadow-indigo-500/50">
      <div className="flex items-center justify-center gap-6 p-3 text-center">
        <span className="text-lg">{currentDate.format(DATE_FORMAT)}</span>
        <span className="text-xl ">Window: {windowDiff}</span>
        {currentDate.isToday() && (
          <span className="text-xl ">
            From start:{" "}
            {dayjs.duration(dayjs().diff(firstIntakeHour)).format(HOUR_FORMAT)}
          </span>
        )}
      </div>

      <div className="flex flex-col overflow-x-auto p-2">
        {sortedIntakes.map((intake) => {
          return (
            <SingleIntake
              key={intake.id}
              intake={{
                ...intake,
                intakeAt: dayjs(intake.intakeAt).format(FORM_FORMAT),
              }}
              openModal={openModal}
            />
          );
        })}
      </div>
    </div>
  );
};
