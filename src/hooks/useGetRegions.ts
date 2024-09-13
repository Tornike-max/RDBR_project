import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../api/api";

export const useGerRegions = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  return { data, isPending, error };
};
