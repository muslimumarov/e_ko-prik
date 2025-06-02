// import React, { useEffect, useState } from "react";
// import { FiSearch } from "react-icons/fi";
// import { BridgesResponseArxiv } from "./interfaces/arxiv.interfaces.tsx";
// import { GetBridgeCard } from "./arxiv-api/arxiv-api.tsx";
// // import {api} from "../../core/hooks/apiUrl.ts";
//
// const Archive: React.FC = () => {
//   // const [limit] = useState(10);
//   // const [total, setTotal] = useState(0);
//   const [filters, setFilters] = useState({
//     region: "",
//     district: "",
//     holat: "",
//     search: "",
//   });
//   // const [card, setCard] = useState<BridgesResponseArxiv | null>(null);
//   // const [next, setNext] = useState<string | null>(null);
//   // const [prev, setPrev] = useState<string | null>(null);
//   // const [current, setCurrent] = useState("http://192.168.100.230:3000/bridges/");
//   // useEffect(() => {
//   //   GetBridgeCard()
//   //     .then((res) => {
//   //       setCard(res as BridgesResponseArxiv);
//   //       setPage(res as BridgesResponseArxiv);
//   //       console.log(res);
//   //     })
//   //     .catch((err) => console.error(err));
//   }, []);
//
//   // const totalPages = Math.ceil(total / limit);
//
//   return (
//     <div className="container mx-auto ">
//       <h1 className={"mb-10 mt-36 text-center text-4xl font-bold text-amber-200 dark:text-[#f35a02]"}>
//         Arxiv Malumotlari
//       </h1>
//       <div className=" grid w-full gap-4 p-4    mobil330:grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
//         <select
//           className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
//           value={filters.region}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, region: e.target.value }))
//           }
//         >
//           <option id={"1"} value="1">
//             Toshkent viloyati
//           </option>
//           <option id={"11"} value="1">
//             Toshkent shahri
//           </option>
//           <option id={"1"} value="1">
//             Qoraqolpog'iston Respublikasi
//           </option>
//           <option id={"1"} value="1">
//             Sirdaryo
//           </option>
//           <option id={"1"} value="1">
//             Namangan
//           </option>
//           <option id={"1"} value="1">
//             Farg'ona
//           </option>
//           <option id={"1"} value="1">
//             Andijon
//           </option>
//           <option id={"1"} value="1">
//             Jizzax
//           </option>
//           <option id={"12"} value="1">
//             Samarqand
//           </option>
//           <option id={"1"} value="1">
//             Surxondaryo
//           </option>
//           <option id={"1"} value="1">
//             Qashqadaryo
//           </option>
//           <option id={"1"} value="1">
//             Navoiy
//           </option>
//           <option id={"1"} value="1">
//             Buxoro
//           </option>
//           <option id={""} value="1">
//             Xorazm
//           </option>
//         </select>
//         <select
//           className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
//           value={filters.district}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, district: e.target.value }))
//           }
//         >
//           <option value="">All Districts</option>
//           <option value="1">Yunusobod</option>
//         </select>
//         <select
//           className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
//           value={filters.holat}
//           onChange={(e) => setFilters((f) => ({ ...f, holat: e.target.value }))}
//         >
//           <option value="">All Holat</option>
//           <option value="yaxshi">Yaxshi</option>
//           <option value="yomon">Yomon</option>
//         </select>
//         <div className="relative w-full max-w-xs">
//           <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
//           <input
//             type="text"
//             className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3  "
//             placeholder="Qidiruv..."
//             value={filters.search}
//             onChange={(e) =>
//               setFilters((f) => ({ ...f, search: e.target.value }))
//             }
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
//         {card?.results?.map((box) => (
//           <div
//             key={box.id}
//             className="rounded-xl border dark:bg-blue-950 border-white/20  shadow-md backdrop-blur-md"
//           >
//             <img
//               className={"h-40 w-full rounded-t-md"}
//               src={box.images?.image || "/no-image.png"}
//               alt={box.name}
//             />
//             <h2 className={"p-4 text-amber-300 dark:text-[#f35a02]"}>
//               {box.name.length > 30 ? box.name.slice(0, 69) + "..." : box.name}
//             </h2>
//           </div>
//         ))}
//       </div>
//       Pagination
//       <div className="mt-8 flex items-center justify-center gap-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((page) => p - 1)}
//           className="rounded-lg border border-gray-300 bg-white/60 px-4 py-2 shadow backdrop-blur-md hover:bg-white disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="font-medium text-gray-700">
//           {/*Page {page} of {totalPages}*/}
//         </span>
//         <button
//           // disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="rounded-lg border border-gray-300 bg-white/60 px-4 py-2 shadow backdrop-blur-md hover:bg-white disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default Archive;
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BridgesResponseArxiv } from "./interfaces/arxiv.interfaces.tsx";
import { GetBridgeCard } from "./arxiv-api/arxiv-api.tsx";

const Archive: React.FC = () => {
  const [page, setPage] = useState(1);
  // const [limit] = useState(10);
  // const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    region: "",
    district: "",
    holat: "",
    search: "",
  });
  const [card, setCard] = useState<BridgesResponseArxiv | null>(null);
  useEffect(() => {
    GetBridgeCard()
      .then((res) => {
        setCard(res as BridgesResponseArxiv);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }, []);

  // const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto ">
      <h1 className={"mb-10 mt-36 text-center text-4xl font-bold"}>
        Arxiv Malumotlari
      </h1>
      <div className=" grid w-full gap-4 p-4    mobil330:grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
        <select
          className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
          value={filters.region}
          onChange={(e) =>
            setFilters((f) => ({ ...f, region: e.target.value }))
          }
        >
          <option id={"1"} value="1">
            Toshkent viloyati
          </option>
          <option id={"11"} value="1">
            Toshkent shahri
          </option>
          <option id={"1"} value="1">
            Qoraqolpog'iston Respublikasi
          </option>
          <option id={"1"} value="1">
            Sirdaryo
          </option>
          <option id={"1"} value="1">
            Namangan
          </option>
          <option id={"1"} value="1">
            Farg'ona
          </option>
          <option id={"1"} value="1">
            Andijon
          </option>
          <option id={"1"} value="1">
            Jizzax
          </option>
          <option id={"12"} value="1">
            Samarqand
          </option>
          <option id={"1"} value="1">
            Surxondaryo
          </option>
          <option id={"1"} value="1">
            Qashqadaryo
          </option>
          <option id={"1"} value="1">
            Navoiy
          </option>
          <option id={"1"} value="1">
            Buxoro
          </option>
          <option id={""} value="1">
            Xorazm
          </option>
        </select>
        <select
          className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
          value={filters.district}
          onChange={(e) =>
            setFilters((f) => ({ ...f, district: e.target.value }))
          }
        >
          <option value="">All Districts</option>
          <option value="1">Yunusobod</option>
        </select>
        <select
          className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
          value={filters.holat}
          onChange={(e) => setFilters((f) => ({ ...f, holat: e.target.value }))}
        >
          <option value="">All Holat</option>
          <option value="yaxshi">Yaxshi</option>
          <option value="yomon">Yomon</option>
        </select>
        <div className="relative w-full max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
          <input
            type="text"
            className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3  "
            placeholder="Qidiruv..."
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
        {card?.results?.map((box) => (
          <div
            key={box.id}
            className="rounded-xl border border-white/20  shadow-md backdrop-blur-md"
          >
            <img
              className={"h-40 w-full rounded-t-md"}
              src={box.images?.image || "/no-image.png"}
              alt={box.name}
            />
            <h2 className={"p-4"}>
              {box.name.length > 30 ? box.name.slice(0, 69) + "..." : box.name}
            </h2>
          </div>
        ))}
      </div>
      Pagination
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border border-gray-300 bg-white/60 px-4 py-2 shadow backdrop-blur-md hover:bg-white disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium text-gray-700">
          {/*Page {page} of {totalPages}*/}
        </span>
        <button
          // disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border border-gray-300 bg-white/60 px-4 py-2 shadow backdrop-blur-md hover:bg-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Archive;
