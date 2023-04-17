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
    href: "/secret-santa",
    label: "Secret Santa",
    description: "Secret Santa draw",
    color: "blue",
    secure: true,
  },
  {
    href: "/food-tracker",
    label: "Tracking my food intake",
    description: "Tracking my food intake during the day",
    color: "green",
    secure: true,
  },
];
