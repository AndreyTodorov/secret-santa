import {
  type UpsertIntakeInputType,
  editIntakeSchema,
} from "@/schemas/intake.schema";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Amount, RequestSource } from "@prisma/client";
import dayjs from "dayjs";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface IntakeFormProps {
  intake?: UpsertIntakeInputType;
  onClose: () => void;
}

export const IntakeForm = ({ intake, onClose }: IntakeFormProps) => {
  const utils = api.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid, isSubmitting, isDirty },
  } = useForm<UpsertIntakeInputType>({
    resolver: zodResolver(editIntakeSchema),
    defaultValues: intake ?? {
      intakeAt: dayjs().format("YYYY-MM-DDTHH:mm"),
      requestSource: RequestSource.Web,
      amount: Amount.Medium,
      description: "",
    },
    mode: "all",
  });

  const { mutateAsync: upsertIntake } = api.intake.upsertIntake.useMutation({
    onSuccess: () => utils.intake.getWeeklyIntakes.invalidate(),
  });
  const { mutateAsync: deleteIntake } = api.intake.deleteIntake.useMutation({
    onSuccess: () => utils.intake.getWeeklyIntakes.invalidate(),
  });

  const onSubmit: SubmitHandler<UpsertIntakeInputType> = async (data) => {
    await toast.promise(
      upsertIntake(data),
      {
        loading: intake ? "Creating..." : "Updating...",
        success: `Successfully ${intake ? "updated" : "created"}`,
        error: `Error occured while ${intake ? "updating" : "creating"}`,
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
    onClose();
  };

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
    onClose();
  };

  // TODO: use Translations
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2">
          <label htmlFor="intakeAt" className="px-1 text-xs font-semibold">
            Intake @
          </label>
          <div className="flex flex-col">
            <input
              className="form-input rounded-lg text-gray-600"
              {...register("intakeAt", {
                setValueAs(value: string) {
                  return dayjs(value).format();
                },
              })}
              type="datetime-local"
            />
            <p className="text-orange-500">{formErrors.intakeAt?.message}</p>
          </div>
        </div>
        <div className="py-2">
          <label htmlFor="amount" className="px-1 text-xs font-semibold">
            Amount
          </label>
          <div className="flex flex-col">
            <select
              {...register("amount")}
              className="form-select rounded-lg text-gray-600"
            >
              {Object.keys(Amount)?.map((amount) => {
                return (
                  <option key={amount} value={amount}>
                    {amount}
                  </option>
                );
              })}
            </select>
            <p className="text-orange-500">{formErrors.amount?.message}</p>
          </div>
        </div>

        <div className="py-2">
          <label htmlFor="description" className="px-1 text-xs font-semibold">
            Description
          </label>
          <div className="flex flex-col">
            <textarea
              className="form-textarea rounded-lg text-gray-600"
              placeholder="add description..."
              {...register("description")}
            />
            <p className="text-orange-500">{formErrors.description?.message}</p>
          </div>
        </div>

        <input
          {...register("requestSource", { value: RequestSource.Web })}
          type="hidden"
        />

        <div className="flex justify-between">
          <button
            className="rounded-md border border-transparent bg-blue-200 py-2 px-3 text-lg font-medium text-blue-900 
            hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[98%]"
            disabled={isSubmitting || !isValid || !isDirty}
            type="submit"
          >
            {intake ? "Edit" : "Add"}
          </button>
          {intake && (
            <button
              type="button"
              className="rounded-md border border-transparent bg-red-200 p-2 text-sm font-medium text-red-900 
            hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-[98%]"
              onClick={() => handleDelete(intake?.id ?? "")}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
