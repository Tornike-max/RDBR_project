import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FilterInterface } from "../../types/types";
import { useSearchParams } from "react-router-dom";

interface PriceForm {
  minPrice: number;
  maxPrice: number;
}

const PriceDropDown = ({
  handleFilterChange,
  showPriceDropdown,
  setShowPriceDropdown,
}: {
  handleFilterChange: (value: string, key: keyof FilterInterface) => void;
  showPriceDropdown: boolean;
  setShowPriceDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const getPrice = searchParams.get("price")?.split("-") || [];

  const { register, handleSubmit, setValue } = useForm<PriceForm>({
    defaultValues: {
      minPrice: 50000,
      maxPrice: 300000,
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPriceDropdown(false);
      }
    };

    if (showPriceDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPriceDropdown, setShowPriceDropdown]);

  const handleMinPriceClick = (price: number) => {
    setSelectedMinPrice(price);
    setValue("minPrice", price);
  };

  const handleMaxPriceClick = (price: number) => {
    setSelectedMaxPrice(price);
    setValue("maxPrice", price);
  };

  const onSubmit = (data: PriceForm) => {
    handleFilterChange(`${data.minPrice}-${data.maxPrice}`, "price");
    setShowPriceDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] shadow-lg p-[24px] z-10 w-[382px]"
        >
          <div className="w-[334px] h-auto flex flex-col justify-center items-center">
            <h3 className="text-[18px] font-semibold mb-[12px] w-full text-start">
              ფასის მიხედვით
            </h3>

            <div className="relative w-full flex items-center gap-[15px]">
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="დან"
                  {...register("minPrice")}
                  defaultValue={getPrice[0]}
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666] pr-[30px]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  ₾
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="მდე"
                  {...register("maxPrice")}
                  defaultValue={getPrice[1]}
                  className="w-[155px] h-[42px] rounded-[6px] border border-[#808A93] p-[10px] text-[16px] placeholder-[#02152666] pr-[30px]"
                />
                <span className="absolute right-[10px] top-[50%] transform -translate-y-[50%] text-[#02152666]">
                  ₾
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mt-[24px] gap-[24px]">
              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                  მინ. ფასი
                </h2>
                <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                  {[50000, 100000, 150000, 200000, 250000, 300000].map(
                    (price) => (
                      <button
                        key={price}
                        onClick={() => handleMinPriceClick(price)}
                        type="button"
                        className={`font-[400] text-[14px] leading-[16.8px] ${
                          selectedMinPrice === price
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

              <div className="w-full flex flex-col justify-center items-start">
                <h2 className="font-[500] leading-[16.8px] text-[14px] text-[#021526]">
                  მაქს. ფასი
                </h2>
                <div className="w-full flex flex-col justify-center items-start gap-2 mt-[24px]">
                  {[50000, 100000, 150000, 200000, 250000, 300000].map(
                    (price) => (
                      <button
                        key={price}
                        onClick={() => handleMaxPriceClick(price)}
                        type="button"
                        className={`font-[400] text-[14px] leading-[16.8px] ${
                          selectedMaxPrice === price
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
            </div>

            <div className="w-full flex justify-end mt-[12px]">
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

export default PriceDropDown;
