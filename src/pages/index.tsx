import PartyForm from "@/components/Forms/PartyForm";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center">
      <PartyForm />
    </div>
  );
};

export default Home;
