import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegionDropDown from "./RegionDropDown";
import { FilterInterface } from "../../types/types";
import PriceDropDown from "./PriceDropDown";
import AreaDropDown from "./AreaDropdown";
import BedroomsDropDown from "./BedRoomsDropDown";

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterInterface>({
    region: searchParams.get("region") || "",
    price: searchParams.get("price") || "",
    area: searchParams.get("area") || "",
    badrooms: searchParams.get("badrooms") || "",
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof FilterInterface];
      if (value) {
        searchParams.set(key, value);
        if (!activeFilters.includes(key)) {
          setActiveFilters((prev) => [...prev, key]);
        }
      } else {
        searchParams.delete(key);
        setActiveFilters((prev) => prev.filter((filter) => filter !== key));
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

  const handleFilterChange = (value: string, key: keyof FilterInterface) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilter = (key: keyof FilterInterface) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: "",
    }));
  };

  return (
    <div className="max-w-[1596px] w-full flex justify-center items-start flex-col gap-[16px]">
      <div className="w-full h-[47px] mt-[77px] flex justify-between items-center">
        <div className="w-auto h-[47px] border-[1px] border-[#DBDBDB] rounded-[10px] p-[6px] flex items-center gap-4 justify-start">
          <RegionDropDown handleFilterChange={handleFilterChange} />
          <PriceDropDown handleFilterChange={handleFilterChange} />
          <AreaDropDown handleFilterChange={handleFilterChange} />
          <BedroomsDropDown handleFilterChange={handleFilterChange} />
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => navigate("/")}
            className="w-[230px] h-[47px] rounded-[10px] bg-[#F93B1D] hover:bg-[#ff5339] duration-200 transition-all text-white px-[16px] py-[10px] gap-[2px] flex items-center justify-center"
          >
            + ლისტინგის დამატება
          </button>
          <button
            onClick={() => navigate("/")}
            className="h-[47px] rounded-[10px] text-[#F93B1D] border-[1px] border-[#F93B1D] px-[16px] py-[10px] gap-[2px] flex items-center justify-center w-[203px]"
          >
            + აგენტის დამატება
          </button>
        </div>
      </div>

      {activeFilters.length >= 1 && (
        <div className="max-w-[553px] w-full h-[29px] flex items-center justify-start gap-[8px]">
          {activeFilters.map((filterKey) => (
            <button
              key={filterKey}
              className="rounded-[43px] py-[6px] px-[10px] border-[1px] border-[#DBDBDB] text-center text-[#354451]"
              onClick={() => resetFilter(filterKey as keyof FilterInterface)}
            >
              {filters[filterKey as keyof FilterInterface]}{" "}
              <span className="ml-2">x</span>
            </button>
          ))}
          <button
            onClick={() =>
              setFilters({ region: "", price: "", area: "", badrooms: "" })
            }
            className="text-[#021526] text-[14px] font-semibold ml-[16px]"
          >
            გასუფთავება
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
