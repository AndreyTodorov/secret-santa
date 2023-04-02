import PartyForm from "@/components/Forms/PartyForm";
import { type NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const greeting = t("home:greeting");

  return (
    <div>
      {greeting}
      <PartyForm />
    </div>
  );
};

export default Home;
