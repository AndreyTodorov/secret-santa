import { FORM_FORMAT } from "@/pages/fasting-tracker";
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
  intake?: UpsertIntakeInputType | null;
  onClose: () => void;
}

export const IntakeForm = ({ intake, onClose }: IntakeFormProps) => {
  const isEditing = !!intake;
  const utils = api.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid, isSubmitting, isDirty },
  } = useForm<UpsertIntakeInputType>({
    resolver: zodResolver(editIntakeSchema),
    defaultValues: intake ?? {
      intakeAt: dayjs().format(FORM_FORMAT),
      requestSource: RequestSource.Web,
      amount: Amount.Medium,
      description: "",
    },
    mode: "all",
  });

  const { mutateAsync: upsertIntake } = api.intake.upsertIntake.useMutation({
    onSuccess: () => utils.intake.getPaginatedIntakes.invalidate(),
    // onSuccess: () => utils.intake.getIntakes.invalidate(),
  });

  const onSubmit: SubmitHandler<UpsertIntakeInputType> = async (data) => {
    await toast.promise(
      upsertIntake(data),
      {
        loading: intake ? "Creating..." : "Updating...",
        success: `Successfully ${intake ? "updated" : "created"} 🎉`,
        error: `Error occured while ${intake ? "updating" : "creating"} 😬`,
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

  const dirty = isEditing ? !isDirty : false;

  // TODO: use Translations
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-1">
          <label htmlFor="intakeAt" className="px-1 text-xs font-semibold">
            Intake time
          </label>
          <div className="flex flex-col">
            <input
              className="form-input rounded-lg text-gray-600"
              {...register("intakeAt", {
                setValueAs(value: string) {
                  return dayjs(value).format(); // from FORM_FORMAT to ISO
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
              rows={3}
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

        <button
          className="w-full rounded-md border border-transparent bg-blue-200 py-1 px-3 text-lg text-blue-900 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
            enabled:hover:bg-blue-300
            enabled:active:scale-[98%] 
            disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-70"
          disabled={isSubmitting || !isValid || dirty}
          type="submit"
        >
          {isEditing ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};
