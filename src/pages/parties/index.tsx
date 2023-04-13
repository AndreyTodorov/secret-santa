import PartyForm from "@/components/Forms/PartyForm";
import Modal from "@/components/Modal";
import { type NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center">
      <PartyForm />
    </div>
  );
};

export default Home;
