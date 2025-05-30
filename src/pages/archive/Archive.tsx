import { Outlet } from "react-router-dom";
import SearchInput from "../../components/searchInput/SearchInput.tsx";
import FilterSelect from "../../components/searchInput/FilterComponent.tsx";

type Project = {
  id: number;
  name: string;
  description: string;
  date: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "Ko‘prik loyihasi",
    description: "Ko‘prik qurilishi – 2024-yil loyihasi.",
    date: "2024-03-10",
    image: "https://source.unsplash.com/400x250/?bridge,construction",
  },
  {
    id: 2,
    name: "Ko'prik qurilishi",
    description: "Viloyatdagi yo‘l ta'mirlash ishlari.",
    date: "2023-12-05",
    image: "https://source.unsplash.com/400x250/?road,construction",
  },
  {
    id: 3,
    name: "Tunnel qurilishi",
    description: "Yangi zamonaviy uylar majmuasi.",
    date: "2024-01-20",
    image: "https://source.unsplash.com/400x250/?house,construction",
  },
  {
    id: 4,
    name: "Texnika bilan ish",
    description: "Qazish ishlari ekskavator yordamida bajarildi.",
    date: "2023-09-15",
    image: "https://source.unsplash.com/400x250/?excavator,site",
  },
  {
    id: 5,
    name: "Obyekt joy qurilishi",
    description: "Shaharning yangi hududida turar joylar.",
    date: "2024-02-01",
    image: "https://source.unsplash.com/400x250/?building,architecture",
  },
  {
    id: 6,
    name: "Ishchilarning mehnati",
    description: "Kompaniya ishchilari qurilishda.",
    date: "2024-04-18",
    image: "https://source.unsplash.com/400x250/?workers,construction",
  },
];

const Archive: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a]">
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="mt-20 text-center text-[36px] font-bold text-black dark:text-white md:text-[45px]">
          Arxiv
        </h1>

        <div className="my-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <FilterSelect />
          <div>
            <SearchInput />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-xl bg-gray-100 shadow transition duration-300 hover:shadow-xl dark:bg-blue-950"
            >
              <img
                src={project.image}
                alt={project.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">
                  {project.name}
                </h3>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Archive;
