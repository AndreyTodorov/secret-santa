import { type NextPage } from "next";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isToday from "dayjs/plugin/isToday";
import { groupBy } from "lodash";
import { Modal } from "@/components/fasting-tracker/IntakeModal";
import { SingleDayCard } from "@/components/fasting-tracker/DayCard";
import ScrollToTop from "@/components/ScrollToTop";
import { type UpsertIntakeInputType } from "@/schemas/intake.schema";
import { useState } from "react";
import { ModalButton } from "@/components/fasting-tracker/IntakeModal/ModalButton";
import { Loader } from "@/components/Loader";
import { DayCardSkeleton } from "@/components/fasting-tracker/Loaders/DayCardSkeleton";
dayjs.extend(duration);
dayjs.extend(isToday);

export const TECH_FORMAT = "YYYY-MM-DD";
export const DATE_FORMAT = "DD.MM.YYYY";
export const HOUR_FORMAT = "HH:mm";
export const FORM_FORMAT = `${TECH_FORMAT}T${HOUR_FORMAT}`;

const HomeIntake: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntake, setSelectedIntake] =
    useState<UpsertIntakeInputType | null>(null);
  const {
    data: fetchedIntakes,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = api.intake.getPaginatedIntakes.useInfiniteQuery(
    { limit: 25 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  );

  function closeModal() {
    setIsModalOpen(false);
  }

  // TODO: don't prop drill, use stateManager or use context
  function openModal(intake: UpsertIntakeInputType | null) {
    setSelectedIntake(intake);
    setIsModalOpen(true);
  }

  if (isLoading) return <DayCardSkeleton count={7} />;

  if (error) return <div>{error.message}</div>;
  if (!fetchedIntakes) return <div>You have no intakes</div>;

  const allIntakes = fetchedIntakes?.pages.flatMap((page) => page.intakes);

  // Group by Date
  const groupedIntakes = groupBy(allIntakes, (intake) => {
    return dayjs(intake.intakeAt).format(TECH_FORMAT);
  });

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <Modal
        intake={selectedIntake}
        title="Add new Intake"
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      <ModalButton openModal={openModal} intake={null} name="Add new" />
      <div className="flex w-full flex-col justify-center gap-5 pt-7 md:max-w-3xl">
        {Object.entries(groupedIntakes).map(([date, intakes], i) => {
          return (
            <SingleDayCard
              openModal={openModal}
              key={`${i}-${date}`}
              date={date}
              intakes={intakes}
            />
          );
        })}
        <div className="flex items-center justify-center">
          {hasNextPage && (
            <button
              className="w-full px-3 pb-3 text-center text-lg text-blue-900
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              type="button"
              onClick={() => fetchNextPage()}
            >
              load more...
            </button>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default HomeIntake;
