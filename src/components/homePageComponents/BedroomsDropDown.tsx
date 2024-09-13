import { useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const BedroomsDropDown = ({
  handleFilterChange,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
}) => {
  const [showBedroomsDropdown, setShowBedroomsDropdown] = useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = useState("");

  const applyBedroomsFilter = () => {
    handleFilterChange(selectedBedrooms, "badrooms");
    setShowBedroomsDropdown(false);
  };

  return (
    <div className="relative">
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
        <div className="absolute top-[50px] left-0 bg-white shadow-lg p-[16px] rounded-md z-10 w-[300px]">
          <h3 className="text-[18px] font-semibold mb-[12px]">
            საძინებლების რაოდენობა
          </h3>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelectedBedrooms("1")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedBedrooms === "1"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              1
            </button>
            <button
              onClick={() => setSelectedBedrooms("2")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedBedrooms === "2"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              2
            </button>
            <button
              onClick={() => setSelectedBedrooms("3")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedBedrooms === "3"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              3
            </button>
            <button
              onClick={() => setSelectedBedrooms("4")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedBedrooms === "4"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              4
            </button>
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
