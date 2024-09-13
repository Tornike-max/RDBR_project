import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRealEstate } from "../api/api";

export const useGetRealEstate = () => {
  const { realEstateId } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["real-estate", `id=${1}`],
    queryFn: () => getRealEstate(realEstateId || ""),
  });

  return { data, isPending, error };
};
