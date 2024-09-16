type RealEstateTypes = {
  isSale: boolean;
  isRental: boolean;
  setIsSale: (value: boolean) => void;
  setIsRental: (value: boolean) => void;
};

const RealEstateType = ({
  isSale,
  isRental,
  setIsSale,
  setIsRental,
}: RealEstateTypes) => {
  return (
    <div className="w-[266px] flex justify-center items-start flex-col gap-5">
      <h3 className="font-[500] text-[16px] leading-[19.54px] text-[#1A1A1F]">
        გარიგების ტიპი
      </h3>
      <div className="w-full flex justify-start items-center gap-[32px]">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_sale"
            className="rounded-checkbox"
            checked={isSale}
            onChange={() => {
              const result = !isSale;
              setIsSale(result);
              setIsRental(!result);
            }}
          />
          <label htmlFor="is_sale" className="text-sm">
            იყიდება
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_rental"
            className="rounded-checkbox"
            checked={isRental}
            onChange={() => {
              const result = !isRental;
              setIsRental(result);
              setIsSale(!result);
            }}
          />
          <label htmlFor="is_rental" className="text-sm">
            ქირავდება
          </label>
        </div>
      </div>
    </div>
  );
};

export default RealEstateType;
