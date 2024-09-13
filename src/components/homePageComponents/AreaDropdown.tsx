import { useEffect, useRef, useState } from "react";
import { FilterInterface } from "../../types/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AreaDropDown = ({
  handleFilterChange,
  showAreaDropdown,
  setShowAreaDropdown,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
  showAreaDropdown: boolean;
  setShowAreaDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedMinArea, setSelectedMinArea] = useState<number | null>(null);
  const [selectedMaxArea, setSelectedMaxArea] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowAreaDropdown(false);
      }
    };

    if (showAreaDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAreaDropdown, setShowAreaDropdown]);

  const applyAreaFilter = () => {
    const min = selectedMinArea ?? 0;
    const max = selectedMaxArea ?? Infinity;
    handleFilterChange(`${min}-${max}`, "area");
    setShowAreaDropdown(false);
  };

  const handleMinAreaClick = (area: number) => {
    setSelectedMinArea(area);
  };

  const handleMaxAreaClick = (area: number) => {
    setSelectedMaxArea(area);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowAreaDropdown(!showAreaDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3] rounded-[6px] flex items-center gap-2 ${
          showAreaDropdown ? "bg-[#F3F3F3]" : ""
        }`}
      >
        <span>ფართობი</span>
        <span>{showAreaDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {showAreaDropdown && (
        <div className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px] z-10 w-[382px]">
          <div className="w-[334px] h-auto flex flex-col justify-center items-center">
            <h3 className="text-[18px] font-semibold mb-[12px] w-full text-start">
              ფართობის მიხედვით
            </h3>
            <div className="relative w-full flex items-center gap-[15px]">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="დან"
                  value={selectedMinArea ?? ""}
                  onChange={(e) => setSelectedMinArea(Number(e.target.value))}
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  მ²
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="მდე"
                  value={selectedMaxArea ?? ""}
                  onChange={(e) => setSelectedMaxArea(Number(e.target.value))}
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  მ²
                </span>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 mt-[24px] gap-[24px]">
              {["min", "max"].map((type) => (
                <div
                  key={type}
                  className="w-full flex flex-col justify-center items-start"
                >
                  <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                    {type === "min" ? "მინ. მ²" : "მაქს. მ²"}
                  </h2>
                  <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                    {[50000, 100000, 150000, 200000, 250000, 300000].map(
                      (area) => (
                        <button
                          key={area}
                          onClick={() =>
                            type === "min"
                              ? handleMinAreaClick(area)
                              : handleMaxAreaClick(area)
                          }
                          className={`font-[400] text-[14px] leading-[16.8px] ${
                            (type === "min" && selectedMinArea === area) ||
                            (type === "max" && selectedMaxArea === area)
                              ? "text-[#F93B1D]"
                              : "text-[#021526]"
                          }`}
                        >
                          {area.toLocaleString()} მ²
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
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
