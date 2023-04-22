import { type UpsertIntakeInputType } from "@/schemas/intake.schema";
import { api } from "@/utils/api";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { IntakeForm } from "./IntakeForm";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  buttonName: string;
  title: string;
  intake?: UpsertIntakeInputType;
}

export const Modal = ({ buttonName, title, intake }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const utils = api.useContext();
  const { mutateAsync: deleteIntake } = api.intake.deleteIntake.useMutation({
    onSuccess: () => utils.intake.getWeeklyIntakes.invalidate(),
  });

  const handleDelete = async (id: string) => {
    await toast.promise(
      deleteIntake({ id }),
      {
        loading: "Deleting...",
        success: `Successfully deleted`,
        error: `Error occured while deleting`,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
      }
    );
    closeModal();
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg border border-gray-700 bg-blue-500 p-3 text-lg text-zinc-200 shadow-md 
          shadow-indigo-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 active:scale-[98%]"
        >
          <span className="p-3 text-lg">{buttonName}</span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* The backdrop, rendered as a fixed sibling to the panel container with its own animation */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            {/* Full-screen container to center the panel */}
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* The actual dialog panel  */}
                <Dialog.Panel className="max-w-[500] transform rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-center justify-between">
                      <span>{title}</span>
                      {intake && (
                        <button
                          title="delete"
                          type="button"
                          className="rounded-md border border-transparent bg-red-200 p-2 text-sm 
                          font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 
                          focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[98%]"
                          onClick={() => handleDelete(intake?.id ?? "")}
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </Dialog.Title>
                  <div>
                    <IntakeForm intake={intake} onClose={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
