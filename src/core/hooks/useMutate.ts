import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Url, useApi } from "./useApi.ts";
import { MutateRequestMethod } from "../../enums/MutateRequestMethod.ts";
import { AxiosRequestConfig } from "axios";

interface MutateProps<TData> {
  url: Url[];
  method: MutateRequestMethod;
  options?: Omit<UseMutationOptions<TData>, "mutationFn" | "mutationKey">;
}

const useMutate = <TData = unknown>({
  url = [],
  method,
  options = {},
}: MutateProps<TData>) => {
  const { mutate } = useApi(url);
  const query = useMutation<TData, Error, AxiosRequestConfig["data"], unknown>({
    mutationKey: url,
    mutationFn: (data) => mutate<TData>({ data, options: { method } }),
    ...options,
  });
  return { query };
};

export default useMutate;
