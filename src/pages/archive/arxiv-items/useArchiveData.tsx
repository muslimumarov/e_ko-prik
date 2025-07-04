import { useEffect, useState } from "react";
import { GetBridgeCard } from "../arxiv-api/arxiv-api.tsx";

interface ArchiveCardImage {
  image: string | null;
}

interface ArchiveCard {
  id: number;
  name: string;
  images: ArchiveCardImage;
}

interface ArchiveResponse {
  count: number;
  results: ArchiveCard[];
}

export interface Filters {
  offset: number;
  limit: number;
  search: string;
  region: string;
  holat: string;
  date: string;
}

export const useArchiveData = () => {
  const [filters, setFilters] = useState<Filters>(() => {
    const savedFilters = sessionStorage.getItem("archive_filters");
    const parsed: Filters =
      savedFilters !== null
        ? JSON.parse(savedFilters)
        : {
            offset: 0,
            limit: 12,
            search: "",
            region: "",
            holat: "",
            date: "",
          };
    return parsed;
  });

  const [card, setCard] = useState<ArchiveResponse | null>(null);
  useEffect(() => {
    sessionStorage.setItem("archive_filters", JSON.stringify(filters));

    const fetchData = async () => {
      try {
        const response = await GetBridgeCard(filters);
        const mappedResults = response.results.map((item) => ({
          id: item.id,
          name: item.name,
          images: {
            image: item.images?.image || "/images/IMG_2016.jpg", // null bo‘lsa default
          },
        }));

        setCard({
          count: response.count,
          results: mappedResults,
        });
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchData();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      offset: 0,
      limit: 12,
      search: "",
      region: "",
      holat: "",
      date: "",
    });
  };

  const handlePageChange = (forward: boolean) => {
    setFilters((prev: Filters) => ({
      ...prev,
      offset: forward
        ? prev.offset + prev.limit
        : Math.max(prev.offset - prev.limit, 0),
    }));
  };

  return {
    filters,
    setFilters,
    card,
    resetFilters,
    handlePageChange,
  };
};
