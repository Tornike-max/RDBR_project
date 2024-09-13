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
        <div className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px]  z-10 w-[382px] ">
          <div className="w-[334px] h-auto flex justify-center items-center flex-col">
            <h3 className="text-[18px] font-semibold mb-[12px] w-full text-start">
              საფასო კატეგორია
            </h3>
            <div className="relative w-full flex items-center gap-[15px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Input 1"
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  ₾
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Input 2"
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  ₾
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mt-[24px]">
              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                  მინ. ფასი
                </h2>
                <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                  <button
                    onClick={() => setSelectedArea("50000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    50,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("100000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    100,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("150000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    150,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("200000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    200,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("250000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    250,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("300000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    300,000 ლ
                  </button>
                </div>
              </div>
              <div className="w-full  flex flex-col justify-center items-start">
                <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                  მაქს. ფასი
                </h2>

                <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                  <button
                    onClick={() => setSelectedArea("50000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    50,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("100000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    100,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("150000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    150,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("200000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    200,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("250000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    250,000 ლ
                  </button>
                  <button
                    onClick={() => setSelectedArea("300000")}
                    className={`font-[400] text-[14px] leading-[16.8px]`}
                  >
                    300,000 ლ
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end mt-[12px]">
              <button
                onClick={applyAreaFilter}
                className="px-[16px] py-[8px] bg-[#F93B1D] text-white rounded-md"
              >
                არჩევა
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaDropDown;
