import { useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AreaDropDown = ({
  handleFilterChange,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
}) => {
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");

  const applyAreaFilter = () => {
    handleFilterChange(selectedArea, "area");
    setShowAreaDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowAreaDropdown(!showAreaDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3] rounded-[6px] flex items-center gap-2 ${
          showAreaDropdown && "bg-[#F3F3F3]"
        }`}
      >
        <span>ფართობი</span>
        <span>{showAreaDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {showAreaDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-lg p-[16px] rounded-md z-10 w-[300px]">
          <h3 className="text-[18px] font-semibold mb-[12px]">ფართობი</h3>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelectedArea("1")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedArea === "1"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 1
            </button>
            <button
              onClick={() => setSelectedArea("2")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedArea === "2"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 2
            </button>
            <button
              onClick={() => setSelectedArea("3")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedArea === "3"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 3
            </button>
            <button
              onClick={() => setSelectedArea("4")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedArea === "4"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 4
            </button>
          </div>

          <div className="flex justify-end mt-[12px]">
            <button
              onClick={applyAreaFilter}
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

export default AreaDropDown;
