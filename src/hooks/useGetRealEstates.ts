import { useQuery } from "@tanstack/react-query";
import { getRealEstates } from "../api/api";

export const useGetRealEstates = () => {
  const { data, isPending } = useQuery({
    queryKey: ["real-estates"],
    queryFn: getRealEstates,
  });

  return { data, isPending };
};
