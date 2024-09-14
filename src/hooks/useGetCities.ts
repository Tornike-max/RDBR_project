import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/api";

export const useGerCities = () => {
  const {
    data: cities,
    isPending: isCitiesPending,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  return { cities, isCitiesPending, error };
};
