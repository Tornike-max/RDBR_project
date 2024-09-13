import { useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const PriceDropDown = ({
  handleFilterChange,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
}) => {
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  const applyPriceFilter = () => {
    handleFilterChange(selectedPrice, "price");
    setShowPriceDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3] rounded-[6px] flex items-center gap-2 ${
          showPriceDropdown && "bg-[#F3F3F3]"
        }`}
      >
        <span>საფასო კატეგორია</span>
        <span>{showPriceDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {showPriceDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-lg p-[16px] rounded-md z-10 w-[300px]">
          <h3 className="text-[18px] font-semibold mb-[12px]">
            საფასო კატეგორია
          </h3>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelectedPrice("1")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedPrice === "1"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 1
            </button>
            <button
              onClick={() => setSelectedPrice("2")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedPrice === "2"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 2
            </button>
            <button
              onClick={() => setSelectedPrice("3")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedPrice === "3"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 3
            </button>
            <button
              onClick={() => setSelectedPrice("4")}
              className={`px-[10px] py-[8px] rounded-md border ${
                selectedPrice === "4"
                  ? "border-[#F93B1D] text-[#F93B1D]"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              Option 4
            </button>
          </div>

          <div className="flex justify-end mt-[12px]">
            <button
              onClick={applyPriceFilter}
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

export default PriceDropDown;
