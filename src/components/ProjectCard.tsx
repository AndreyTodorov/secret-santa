import Link from "next/link";

export interface ProjectCardsProps {
  href: string;
  label: string;
  description: string;
  color: string;
  secure?: boolean;
}
export const ProjectCard = ({
  href,
  label,
  description,
  color,
}: ProjectCardsProps) => {
  let colorClasses = `bg-red-100 hover:text-red-500 focus:text-red-600`;
  if (color === "blue") {
    colorClasses = `bg-blue-100 hover:text-blue-500 focus:text-blue-600`;
  } else if (color === "green") {
    colorClasses = `bg-green-100 hover:text-green-500 focus:text-green-600`;
  } else if (color === "orange") {
    colorClasses = `bg-orange-100 hover:text-orange-500 focus:text-orange-600`;
  }

  return (
    <Link
      className={`mt-6 w-96 rounded-xl border-2 border-cyan-700 p-6 text-left shadow-lg shadow-indigo-500/50 transition hover:scale-[103%] ${colorClasses}`}
      href={href}
    >
      <h3 className="text-2xl font-bold">{label} &rarr;</h3>
      <p className="mt-4 text-xl">{description}</p>
    </Link>
  );
};
