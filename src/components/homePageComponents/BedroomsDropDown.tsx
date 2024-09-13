import { useEffect, useRef, useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { bedrooms } from "../../constants/constant";

const BedroomsDropDown = ({
  handleFilterChange,
  showBedroomsDropdown,
  setShowBedroomsDropdown,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
  showBedroomsDropdown: boolean;
  setShowBedroomsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedBedroom, setSelectedBedroom] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowBedroomsDropdown(false);
      }
    };

    if (showBedroomsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBedroomsDropdown, setShowBedroomsDropdown]);

  const applyBedroomsFilter = () => {
    handleFilterChange(selectedBedroom, "bedrooms");
    setShowBedroomsDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowBedroomsDropdown(!showBedroomsDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3] rounded-[6px] flex items-center gap-2 ${
          showBedroomsDropdown && "bg-[#F3F3F3]"
        }`}
      >
        <span>საძინებლების რაოდენობა</span>
        <span>
          {showBedroomsDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>

      {showBedroomsDropdown && (
        <div className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px]  z-10 w-[282px]">
          <h3 className="text-[16px] leading-[19.2px] font-[500] mb-[12px]">
            საძინებლების რაოდენობა
          </h3>
          <div className="w-[216px] flex justify-start items-center flex-wrap gap-4">
            {bedrooms.map((bedroom) => (
              <button
                key={bedroom.value}
                onClick={() => setSelectedBedroom(String(bedroom.value))}
                className={`w-[41px] h-[42px] rounded-[6px] border  ${
                  selectedBedroom === String(bedroom.value)
                    ? "border-[#F93B1D] text-[#F93B1D]"
                    : "border-[#808A93] text-[#02152666]/40"
                } flex items-center justify-center p-[10]`}
              >
                {bedroom.value}
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-[12px]">
            <button
              onClick={applyBedroomsFilter}
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

export default BedroomsDropDown;
