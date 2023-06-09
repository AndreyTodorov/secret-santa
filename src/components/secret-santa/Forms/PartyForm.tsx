import {
  type AddPartyInputType,
  createPartySchema,
} from "@/schemas/party.schema";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const PartyForm = () => {
  const { t } = useTranslation();
  const partyDate = t("forms:partyDate");
  const notificationDate = t("forms:notificationDate");
  const description = t("forms:description");
  const addDescription = t("forms:addDescription");
  const budget = t("forms:budget");
  const createButton = t("forms:createButton");

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<AddPartyInputType>({
    resolver: zodResolver(createPartySchema),
  });

  // const { data: parties, isLoading } = api.party.getAll.useQuery();
  const { mutateAsync, isLoading: isSubmitting } = api.party.create.useMutation(
    {
      onSuccess: () => reset(),
    }
  );

  const onSubmit: SubmitHandler<AddPartyInputType> = async (data) => {
    console.log({ data });
    return;

    await toast.promise(
      mutateAsync(data),
      {
        loading: "Creating...",
        success: "Successfully created",
        error: "Error occured while creating",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 4000,
        },
        error: {
          duration: 2000,
        },
      }
    );
  };
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <div className="py-2">
            <label
              htmlFor="notificationAt"
              className="px-1 text-xs font-semibold"
            >
              {notificationDate}
            </label>
            <div className="flex flex-col">
              <input
                className=""
                {...register("notificationAt", { valueAsDate: true })}
                type="date"
              />
              <p className="text-orange-500">
                {formErrors.notificationAt?.message}
              </p>
            </div>
          </div>

          <div className="py-2">
            <label htmlFor="date" className="px-1 text-xs font-semibold">
              {partyDate}
            </label>
            <div className="flex flex-col">
              <input
                className=""
                type="date"
                {...register("date", { valueAsDate: true })}
              />
              <p className="text-orange-500">{formErrors.date?.message}</p>
            </div>
          </div>
        </div>

        <div className="py-2">
          <label htmlFor="" className="px-1 text-xs font-semibold">
            {budget}
          </label>
          <div className="flex flex-col">
            <input
              type="text "
              placeholder={budget}
              className="w-full"
              {...register("budget")}
            />
            <p className="text-orange-500">{formErrors.budget?.message}</p>
          </div>
        </div>

        <div className="py-2">
          <label htmlFor="" className="px-1 text-xs font-semibold">
            {description}
          </label>
          <div className="flex flex-col">
            <textarea
              className=""
              placeholder={addDescription}
              {...register("description")}
            />
            <p className="text-orange-500">{formErrors.description?.message}</p>
          </div>
        </div>

        <button className="" disabled={isSubmitting} type="submit">
          {createButton}
        </button>
      </form>
    </div>
  );
};

export default PartyForm;
