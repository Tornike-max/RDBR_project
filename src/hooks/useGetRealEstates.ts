import { useQuery } from "@tanstack/react-query";
import { getRealEstates } from "../api/api";
import { useSearchParams } from "react-router-dom";
import { RealEstate } from "../types/types";

export const useGetRealEstates = () => {
  const [searchParams] = useSearchParams();
  const getPrice = searchParams.get("price") || "";
  const getRegion = searchParams.get("region") || "";
  const getArea = searchParams.get("area") || "";
  const getBedroom = searchParams.get("bedrooms") || "";
  const { data, isPending } = useQuery<RealEstate[]>({
    queryKey: [
      "real-estates",
      `filterByPrice=${getPrice}`,
      `filterByRegion=${getRegion}`,
      `filterByArea=${getArea}`,
      `filterByBedroom=${getBedroom}`,
    ],
    queryFn: () => getRealEstates(getPrice, getRegion, getArea, getBedroom),
  });

  return { data, isPending };
};
