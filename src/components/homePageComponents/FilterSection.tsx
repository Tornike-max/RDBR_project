import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { regions } from "../../constants/constant";

interface FilterInterface {
  region: string;
  price: string;
  area: string;
  badrooms: string;
}

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
          <div className="flex max-w-[135px] w-full items-start flex-col justify-center">
            <select
              onChange={(e) => handleFilterChange(e.target.value, "region")}
              className="w-full text-[16px] px-[16px] py-[8px]"
              value={filters.region}
            >
              {regions?.map(
                (region: {
                  id: string | number;
                  city: string;
                  value: string;
                }) => (
                  <option key={region.id} value={region.value}>
                    {region.city}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex max-w-[199px] w-full items-start flex-col justify-center text-[16px]">
            <select
              onChange={(e) => handleFilterChange(e.target.value, "price")}
              className="w-full text-[16px] px-[16px] py-[8px]"
              value={filters.price}
            >
              <option value="">საფასო კატეგორია</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
          </div>

          <div className="flex max-w-[124px] w-full items-start flex-col justify-center text-[16px]">
            <select
              onChange={(e) => handleFilterChange(e.target.value, "area")}
              className="w-full text-[16px] px-[16px] py-[8px]"
              value={filters.area}
            >
              <option value="">ფართობი</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
          </div>

          <div className="flex max-w-[262px] w-full items-start flex-col justify-center text-[16px]">
            <select
              onChange={(e) => handleFilterChange(e.target.value, "badrooms")}
              className="w-full text-[16px] px-[16px] py-[8px]"
              value={filters.badrooms}
            >
              <option value="">საძინებლების რაოდენობა</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => navigate("/")}
            className="w-[230px] h-[47px] rounded-[10px] bg-[#F93B1D] hover:bg-[#ff5339] duration-200 transition-all text-white px-[16px] py-[10px] gap-[2px] flex items-center justify-center"
          >
            ლისტინგის დამატება
          </button>
          <button
            onClick={() => navigate("/")}
            className="h-[47px] rounded-[10px] text-[#F93B1D] border-[1px] border-[#F93B1D] px-[16px] py-[10px] gap-[2px] flex items-center justify-center w-[203px]"
          >
            აგენტის დამატება
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
