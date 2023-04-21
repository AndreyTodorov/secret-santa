import { type ProjectCardsProps } from "@/components/ProjectCard";

export const projectCards: ProjectCardsProps[] = [
  {
    href: "/fuel",
    label: "Fuel Money Calculator",
    description: "Find how much your trip costs you",
    color: "blue",
    secure: false,
  },

  {
    href: "/fasting-tracker",
    label: "Tracking my fasting",
    description: "Tracking my food intake during the day",
    color: "green",
    secure: true,
  },
  {
    href: "/secret-santa",
    label: "Secret Santa",
    description: "Secret Santa draw",
    color: "blue",
    secure: true,
  },
];
