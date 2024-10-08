import FilterSection from "../components/homePageComponents/FilterSection";
import { useGetRealEstates } from "../hooks/useGetRealEstates";
import CardComponent from "../components/homePageComponents/CardComponent";
import { RealEstate } from "../types/types";
import { useSearchParams } from "react-router-dom";
import Loader from "../ui/Loader";
import NotFound from "../ui/NotFound";

const HomePage = () => {
  const { data, isPending } = useGetRealEstates();
  const [searchParams] = useSearchParams();
  const getRegion = searchParams.get("region") || "";
  const getPrice = searchParams.get("price") || "";
  const getArea = searchParams.get("area") || "";
  const getBedrooms = searchParams.get("bedrooms") || "";

  if (isPending) return <Loader />;

  let filteredData = data;

  const filters = [
    { key: "region", value: getRegion },
    { key: "price", value: getPrice },
    { key: "area", value: getArea },
    { key: "bedrooms", value: getBedrooms },
  ];

  filters.forEach((filter) => {
    switch (filter.key) {
      case "region":
        if (filter.value !== "") {
          filteredData = filteredData?.filter(
            (item) => item.city.region.name === filter.value
          );
        }
        break;
      case "price":
        if (filter.value !== "") {
          const priceArr = filter.value.split("-");
          if (Number(priceArr[1]) === 0) {
            filteredData = filteredData?.filter(
              (item) => item.price > Number(priceArr[0])
            );
          }
          if (priceArr[0] !== "0" && priceArr[1] !== "0") {
            filteredData = filteredData?.filter(
              (item) =>
                item.price >= Number(priceArr[0]) &&
                item.price <= Number(priceArr[1])
            );
          }
        }
        break;
      case "area":
        if (filter.key === "area") {
          if (filter.value !== "") {
            const areaArr = filter.value.split("-");

            if (Number(areaArr[1]) === 0) {
              filteredData = filteredData?.filter(
                (item) => item.area > Number(areaArr[0])
              );
            }

            if (areaArr[0] !== "0" && areaArr[1] !== "0") {
              filteredData = filteredData?.filter(
                (item) =>
                  item.area >= parseFloat(areaArr[0]) &&
                  item.area <= parseFloat(areaArr[1])
              );
            }
          }
        }
        break;
      case "bedrooms":
        if (filter.value !== "") {
          filteredData = filteredData?.filter(
            (item) => item.bedrooms === Number(filter.value)
          );
        }
        break;
      default:
        break;
    }
  });

  return (
    <div className="w-full px-[162px] flex justify-center items-center flex-col mt-[96px]">
      <FilterSection />
      {filteredData?.length === 0 ? (
        <NotFound />
      ) : (
        <div className="w-full  mt-[29px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {filteredData?.map((realEstate: RealEstate) => (
            <CardComponent key={realEstate.id} realEstate={realEstate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
