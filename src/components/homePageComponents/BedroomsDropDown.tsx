import { useEffect, useRef, useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const BedroomsDropDown = ({
  handleFilterChange,
  showBedroomsDropdown,
  setShowBedroomsDropdown,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
  showBedroomsDropdown: boolean;
  setShowBedroomsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedBedroom, setSelectedBedroom] = useState<number | null>(null);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedBedroom(value ? parseInt(value, 10) : null);
  };

  const applyBedroomsFilter = () => {
    handleFilterChange(selectedBedroom?.toString() || "", "bedrooms");
    setShowBedroomsDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowBedroomsDropdown(!showBedroomsDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3] rounded-[6px] flex items-center gap-2 ${
          showBedroomsDropdown ? "bg-[#F3F3F3]" : ""
        }`}
      >
        <span className="font-firago font-medium leading-[19.2px] text-[16px]">
          საძინებლების რაოდენობა
        </span>
        <span>
          {showBedroomsDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>

      {showBedroomsDropdown && (
        <div className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px] z-10 w-[282px]">
          <h3 className="text-[16px] leading-[19.2px] font-firago font-medium mb-[12px]">
            საძინებლების რაოდენობა
          </h3>
          <div className="w-[216px] flex flex-col gap-4">
            <input
              type="text"
              value={selectedBedroom ?? ""}
              onChange={handleInputChange}
              className="w-[41px] h-[42px] rounded-[6px] border border-[#808A93] text-[#021526] text-center p-[10px] leading-[16.8px] font-[400] text-[14px]"
            />
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
