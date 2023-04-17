import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { type NextPage } from "next";

interface Inputs {
  kilometers: number;
  consumption: number;
  fuelPrice: number;
  passengers: number | null;
}

const schema = z
  .object({
    kilometers: z.number().min(1).max(3000),
    consumption: z.number().min(1).max(100),
    fuelPrice: z.number().min(1).max(10),
    passengers: z.number().min(1).int().max(20).optional(),
  })
  .required();

export const Fuel: NextPage = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isValid, errors: formErrors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      consumption: 6,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const fuelBurned =
      Math.round((data.kilometers / 100) * data.consumption * 100) / 100;
    const moneyBurned = Math.round(fuelBurned * data.fuelPrice * 100) / 100;

    let perPaxMessage = "";
    if (data.passengers) {
      const pricePerPerson =
        Math.round((moneyBurned / data.passengers) * 100) / 100;
      perPaxMessage = `, which is <b>${pricePerPerson}</b> lv per passenger`;
    }

    const result = `You burned <b>${fuelBurned}</b> liters, costing you <b>${moneyBurned}</b> lv${perPaxMessage}`;
    setMessage(result);
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="flex w-screen bg-slate-700 p-8 text-cyan-300">
        <div className="flex-1">
          <h1 className="pb-4 text-3xl font-bold text-slate-300">Gas money</h1>

          {/* FORM */}
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap items-center gap-2">
                <div className="whitespace-nowrap">I&apos;ve traveled</div>
                <input
                  type="number"
                  step="0.1"
                  {...register("kilometers", {
                    setValueAs: (v: string) => parseFloat(v),
                  })}
                  className="form-input h-8 w-20 rounded-lg text-gray-600"
                />
                <div className="whitespace-nowrap">
                  kilometers. My car consumes
                </div>

                <input
                  type="number"
                  step="0.01"
                  {...register("consumption", {
                    setValueAs: (v: string) => parseFloat(v),
                  })}
                  className="form-input h-8 w-20 rounded-lg text-gray-600"
                />

                <div className="whitespace-nowrap">
                  l/100km. The fuel price is
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register("fuelPrice", {
                    setValueAs: (v: string) => parseFloat(v),
                  })}
                  className="form-input h-8 w-20 rounded-lg text-gray-600"
                />
                <div className="whitespace-nowrap">
                  leva per liter and we are
                </div>

                <input
                  type="number"
                  {...register("passengers", { valueAsNumber: true })}
                  className="form-input h-8 w-20 rounded-lg text-gray-600"
                />
                <div className="whitespace-nowrap">passengers.</div>
              </div>

              <p className="text-orange-500">
                {formErrors.kilometers?.message}
              </p>
              <p className="text-orange-500">
                {formErrors.consumption?.message}
              </p>
              <p className="text-orange-500">{formErrors.fuelPrice?.message}</p>
              <p className="text-orange-500">
                {formErrors.passengers?.message}
              </p>

              <button
                type="submit"
                disabled={!isValid}
                className={`my-2 rounded-lg bg-red-500 p-3 ${
                  isValid ? "bg-red-500 hover:bg-red-600" : "bg-red-300"
                }`}
              >
                Submit
              </button>
            </form>
          </div>
          {message && <div dangerouslySetInnerHTML={{ __html: message }}></div>}
        </div>
      </div>
    </div>
  );
};

export default Fuel;
