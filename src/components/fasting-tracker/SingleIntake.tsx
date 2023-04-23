import { HOUR_FORMAT } from "@/pages/fasting-tracker";
import { type UpsertIntakeInputType } from "@/schemas/intake.schema";
import dayjs from "dayjs";
import { ModalButton } from "./IntakeModal/ModalButton";

interface Props {
  intake: UpsertIntakeInputType;
  openModal: (intake: UpsertIntakeInputType | null) => void;
}

export const SingleIntake = ({ intake, openModal }: Props) => {
  return (
    <div
      className="group relative flex items-center justify-between gap-5 border border-cyan-600 
      bg-indigo-100 p-2 px-3 shadow-md shadow-indigo-500/50 transition hover:scale-[101%]"
    >
      <div className="absolute right-1 hidden h-fit group-hover:block">
        <ModalButton openModal={openModal} intake={intake} name="Edit" />
        {/* <Modal buttonName="Edit" title="Edit Intake" intake={intake} /> */}
      </div>
      <div className="pb-1 text-center">
        <span className="pl text-lg font-bold">
          {dayjs(intake.intakeAt).format(HOUR_FORMAT)}
        </span>
      </div>

      <span className="flex-1">{intake.description}</span>

      <div>
        <div className="flex flex-col justify-between text-right">
          <span>{intake.amount}</span>
          <span>{intake.requestSource}</span>
        </div>
      </div>
    </div>
  );
};
