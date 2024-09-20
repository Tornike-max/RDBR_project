import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegionDropDown from "./RegionDropDown";
import { FilterInterface } from "../../types/types";
import PriceDropDown from "./PriceDropDown";
import AreaDropDown from "./AreaDropdown";
import BedroomsDropDown from "./BedroomsDropDown";
import { formatAreaFilter, formatPriceFilter } from "../../functions/functions";
import CreateAgentModal from "../createAgentComponents/CreateAgentModal";

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterInterface>({
    region: searchParams.get("region") || "",
    price: searchParams.get("price") || "",
    area: searchParams.get("area") || "",
    bedrooms: searchParams.get("bedrooms") || "",
  });
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showBedroomsDropdown, setShowBedroomsDropdown] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    const newActiveFilters: string[] = [];

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof FilterInterface];
      if (value) {
        updatedSearchParams.set(key, value);
        if (!newActiveFilters.includes(key)) {
          newActiveFilters.push(key);
        }
      } else {
        updatedSearchParams.delete(key);
      }
    });

    setSearchParams(updatedSearchParams);
    setActiveFilters(newActiveFilters);
  }, [filters]);

  useEffect(() => {
    const closeAllDropdownsExcept = (openDropdown: string) => {
      setShowRegionDropdown(openDropdown === "region");
      setShowPriceDropdown(openDropdown === "price");
      setShowAreaDropdown(openDropdown === "area");
      setShowBedroomsDropdown(openDropdown === "bedrooms");
    };

    if (showRegionDropdown) closeAllDropdownsExcept("region");
    else if (showPriceDropdown) closeAllDropdownsExcept("price");
    else if (showAreaDropdown) closeAllDropdownsExcept("area");
    else if (showBedroomsDropdown) closeAllDropdownsExcept("bedrooms");
  }, [
    showRegionDropdown,
    showPriceDropdown,
    showAreaDropdown,
    showBedroomsDropdown,
  ]);

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

  const handleOpenAgentModal = () => {
    setIsAgentModalOpen(true);
  };

  return (
    <div className="max-w-[1596px] w-full flex justify-center items-start flex-col gap-[16px]">
      <div className="w-full h-[47px]  flex justify-between items-center">
        <div className="w-auto h-[47px] border-[1px] border-[#DBDBDB] rounded-[10px] p-[6px] flex items-center gap-4 justify-start z-30">
          <RegionDropDown
            handleFilterChange={handleFilterChange}
            showRegionDropdown={showRegionDropdown}
            setShowRegionDropdown={setShowRegionDropdown}
          />
          <PriceDropDown
            handleFilterChange={handleFilterChange}
            showPriceDropdown={showPriceDropdown}
            setShowPriceDropdown={setShowPriceDropdown}
          />
          <AreaDropDown
            handleFilterChange={handleFilterChange}
            showAreaDropdown={showAreaDropdown}
            setShowAreaDropdown={setShowAreaDropdown}
          />
          <BedroomsDropDown
            handleFilterChange={handleFilterChange}
            showBedroomsDropdown={showBedroomsDropdown}
            setShowBedroomsDropdown={setShowBedroomsDropdown}
          />
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            onClick={() => navigate("/realEstate/create")}
            className="w-[230px] h-[47px] rounded-[10px] bg-[#F93B1D] hover:bg-[#ff5339] duration-200 transition-all text-[#FFFFFF] px-[16px] py-[10px] gap-[2px] flex items-center justify-center"
          >
            + ლისტინგის დამატება
          </button>
          <button
            onClick={() => handleOpenAgentModal()}
            className="h-[47px] rounded-[10px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] border-[1px] border-[#F93B1D] px-[16px] py-[10px] gap-[2px] flex items-center justify-center w-[203px]"
          >
            + აგენტის დამატება
          </button>
        </div>
      </div>

      {isAgentModalOpen && (
        <CreateAgentModal setIsAgentModalOpen={setIsAgentModalOpen} />
      )}

      {activeFilters.length >= 1 && (
        <div className="max-w-[553px] w-full h-[29px] flex items-center justify-start gap-[8px]">
          {activeFilters.map((filterKey, index) => (
            <button
              key={`${filterKey}-${index}`}
              className="rounded-[43px] py-[6px] px-[10px] border-[1px] border-[#DBDBDB] text-center text-[#354451]"
              onClick={() => resetFilter(filterKey as keyof FilterInterface)}
            >
              {filterKey === "area"
                ? formatAreaFilter(filters[filterKey as keyof FilterInterface])
                : filterKey === "price"
                ? formatPriceFilter(filters[filterKey as keyof FilterInterface])
                : filters[filterKey as keyof FilterInterface]}
              <span className="ml-2">x</span>
            </button>
          ))}
          <button
            onClick={() =>
              setFilters({ region: "", price: "", area: "", bedrooms: "" })
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
