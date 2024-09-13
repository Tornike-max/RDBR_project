import { useState } from "react";
import { regions } from "../../constants/constant";
import { FilterInterface } from "../../types/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const RegionDropDown = ({
  handleFilterChange,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
}) => {
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const toggleRegion = (regionValue: string) => {
    if (selectedRegions.includes(regionValue)) {
      setSelectedRegions(
        selectedRegions.filter((value) => value !== regionValue)
      );
    } else {
      setSelectedRegions([...selectedRegions, regionValue]);
    }
  };

  const applyRegionFilter = () => {
    handleFilterChange(selectedRegions.join(","), "region");
    setShowRegionDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowRegionDropdown(!showRegionDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3]  rounded-[6px] flex items-center gap-2 ${
          showRegionDropdown && "bg-[#F3F3F3]"
        }`}
      >
        <span>რეგიონების მიხედვით</span>
        <span>
          {showRegionDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>

      {showRegionDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px]  z-10 w-[731px] h-auto space-y-[24px]">
          <h3 className="text-[18px] font-semibold mb-[12px]">
            რეგიონების მიხედვით
          </h3>
          <div className="grid grid-cols-3 gap-[30px]">
            {regions?.map(
              (region: {
                id: string | number;
                city: string;
                value: string;
              }) => (
                <label key={region.id} className="custom-checkbox">
                  <input
                    type="checkbox"
                    value={region.value}
                    checked={selectedRegions.includes(region.value)}
                    onChange={() => toggleRegion(region.value)}
                  />
                  <span></span>
                  <span
                    className={`text-[16px] leading-[16.8px] text-[#021526] font-[400]`}
                  >
                    {region.city}
                  </span>
                </label>
              )
            )}
          </div>

          <div className="flex justify-end mt-[12px]">
            <button
              onClick={applyRegionFilter}
              className="px-[16px] py-[8px] bg-[#F93B1D] text-white rounded-md"
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionDropDown;
