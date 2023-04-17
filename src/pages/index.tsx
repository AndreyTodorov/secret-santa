import { ProjectCard } from "@/components/ProjectCard";
import { projectCards } from "@/lib/projects";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        {projectCards?.map((card) => {
          if (card.secure) {
            if (session) {
              return (
                <ProjectCard key={`${card.href}-${card.label}`} {...card} />
              );
            }

            return null;
          } else {
            return <ProjectCard key={`${card.href}-${card.label}`} {...card} />;
          }
        })}
      </div>
    </div>
  );
};

export default Home;
