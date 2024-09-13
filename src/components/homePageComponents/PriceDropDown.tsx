import { useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
          showPriceDropdown ? "bg-[#F3F3F3]" : ""
        }`}
      >
        <span>საფასო კატეგორია</span>
        <span>{showPriceDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {showPriceDropdown && (
        <div className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px] z-10 w-[382px]">
          <div className="w-[334px] h-auto flex flex-col justify-center items-center">
            <h3 className="text-[18px] font-semibold mb-[12px] w-full text-start">
              საფასო კატეგორია
            </h3>
            <div className="relative w-full flex items-center gap-[15px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Input 1"
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666] pr-[30px]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  ₾
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Input 2"
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666] pr-[30px]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  ₾
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mt-[24px] gap-[24px]">
              {["min", "max"].map((type) => (
                <div
                  key={type}
                  className="w-full flex flex-col justify-center items-start "
                >
                  <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                    {type === "min" ? "მინ. ფასი" : "მაქს. ფასი"}
                  </h2>
                  <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                    {[50000, 100000, 150000, 200000, 250000, 300000].map(
                      (price) => (
                        <button
                          key={price}
                          onClick={() => setSelectedPrice(price.toString())}
                          className={`font-[400] text-[14px] leading-[16.8px] ${
                            selectedPrice === price.toString()
                              ? "text-[#F93B1D]"
                              : "text-[#021526]"
                          }`}
                        >
                          {price.toLocaleString()} ლ
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-end mt-[12px]">
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
