import { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { get, isNil } from "lodash";

const useQueryParams = () => {
  const [params, setParams] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const parseQueryString = useCallback(() => {
    let params: object = {};

    if (search) {
      const searchQuery = decodeURI(search.slice(1));

      searchQuery.split("&").forEach((query) => {
        const [key] = query.split("=");

        if (get(params, key)) {
          params = {
            ...params,
            [key]: searchParams.getAll(key),
          };
        } else {
          params = {
            ...params,
            [key]: searchParams.get(key),
          };
        }
      });
    }

    return params;
  }, [search, searchParams]);

  useEffect(() => {
    setParams(parseQueryString());
  }, [search, parseQueryString]);

  const handleSetParams = (data: Record<string, unknown>) => {
    const query = new URLSearchParams(
      Object.entries(data)
        .filter(([values]) => !isNil(values))
        .flatMap(([key, values]) =>
          Array.isArray(values)
            ? values.map((value) => [`${key}[]`, value])
            : [[key, values]],
        ),
    );
    setSearchParams(query);
  };

  return {
    params,
    handleSetParams,
  };
};

export default useQueryParams;
