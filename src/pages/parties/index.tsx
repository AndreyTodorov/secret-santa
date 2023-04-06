import PartyForm from "@/components/Forms/PartyForm";
import Modal from "@/components/Modal";
import { type NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const addNewParty = t("forms:addNewParty");
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex items-center justify-center">
      <label htmlFor="my-modal" className="btn" onClick={handleToggle}>
        Add new Party
      </label>
      <Modal isOpen={isOpen}>
        <label htmlFor="" className="px-1 text-lg">
          {addNewParty}
        </label>
        <PartyForm />
        <div className="modal-action">
          {/* closes the modal */}
          <button className="btn-secondary btn" onClick={handleToggle}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
