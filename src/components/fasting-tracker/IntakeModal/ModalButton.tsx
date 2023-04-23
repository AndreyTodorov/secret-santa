import { type UpsertIntakeInputType } from "@/schemas/intake.schema";

export const ModalButton = ({
  openModal,
  name,
  intake,
}: {
  openModal: (intake: UpsertIntakeInputType | null) => void;
  name: string;
  intake: UpsertIntakeInputType | null;
}) => {
  return (
    <button
      type="button"
      onClick={() => openModal(intake)}
      className="rounded-lg border border-gray-700 bg-blue-500 p-3 text-lg text-zinc-200 shadow-md shadow-indigo-500/50 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
          active:scale-[98%]"
    >
      <span className="p-3 text-lg">{name}</span>
    </button>
  );
};
