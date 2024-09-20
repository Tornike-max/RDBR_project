import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FilterInterface } from "../../types/types";
import { formatArea } from "../../functions/functions"; // Ensure this can handle decimals
import { useSearchParams } from "react-router-dom";

interface AreaForm {
  minArea: number;
  maxArea: number;
}

const AreaDropDown = ({
  handleFilterChange,
  showAreaDropdown,
  setShowAreaDropdown,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
  showAreaDropdown: boolean;
  setShowAreaDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const getArea = searchParams.get("area")?.split("-") || [];

  const { register, handleSubmit, setValue } = useForm<AreaForm>({
    defaultValues: {
      minArea: Number(getArea[0]) || 0,
      maxArea: Number(getArea[1]) || 0,
    },
  });

  const [selectedMinArea, setSelectedMinArea] = useState<number | null>(null);
  const [selectedMaxArea, setSelectedMaxArea] = useState<number | null>(null);

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

  const handleMinAreaClick = (area: number) => {
    setSelectedMinArea(area);
    setValue("minArea", area);
  };

  const handleMaxAreaClick = (area: number) => {
    setSelectedMaxArea(area);
    setValue("maxArea", area);
  };

  const onSubmit = (data: AreaForm) => {
    handleFilterChange(`${data.minArea}-${data.maxArea}`, "area");
    setShowAreaDropdown(false);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px] z-10 w-[382px]"
        >
          <div className="w-[334px] h-auto flex flex-col justify-center items-center">
            <h3 className="text-[18px] font-semibold mb-[16px] w-full text-start">
              ფართობის მიხედვით
            </h3>

            <div className="relative w-full flex items-center gap-[15px]">
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="დან"
                  step="0.1"
                  {...register("minArea")}
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  მ²
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="მდე"
                  step="0.1"
                  {...register("maxArea")}
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  მ²
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mt-[24px] gap-[24px]">
              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                  მინ. ფართობი
                </h2>
                <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                  {[50, 60, 70, 80, 90, 100, 120].map((area) => (
                    <button
                      key={area}
                      onClick={() => handleMinAreaClick(area)}
                      type="button"
                      className={`font-[400] text-[14px] leading-[16.8px] ${
                        selectedMinArea === area
                          ? "text-[#F93B1D]"
                          : "text-[#021526]"
                      }`}
                    >
                      {formatArea(area)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                  მაქს. ფართობი
                </h2>
                <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                  {[50, 60, 70, 80, 90, 100, 120].map((area) => (
                    <button
                      key={area}
                      onClick={() => handleMaxAreaClick(area)}
                      type="button"
                      className={`font-[400] text-[14px] leading-[16.8px] ${
                        selectedMaxArea === area
                          ? "text-[#F93B1D]"
                          : "text-[#021526]"
                      }`}
                    >
                      {formatArea(area)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end mt-[30px]">
              <button
                type="submit"
                className="px-[16px] py-[8px] bg-[#F93B1D] text-white rounded-md"
              >
                არჩევა
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AreaDropDown;
