import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { HiMiniCheck } from "react-icons/hi2";

type RealEstateTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
};

const RealEstateType = ({ register, errors, trigger }: RealEstateTypes) => {
  return (
    <div className="w-[266px] flex justify-center items-start flex-col gap-5">
      <h3 className="font-helvatica text-[16px] leading-[19.54px] text-[#1A1A1F]">
        გარიგების ტიპი
      </h3>
      <div className="w-full flex justify-start items-center gap-[32px]">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="is_sale"
            className="rounded-checkbox"
            value="sale"
            {...register("deal_type", { required: "სავალდებულოა" })}
            onChange={async () => {
              await trigger("deal_type");
            }}
          />
          <label
            htmlFor="is_sale"
            className="text-[14px] font-firago font-normal"
          >
            იყიდება
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="is_rental"
            className="rounded-checkbox"
            value="rental"
            {...register("deal_type", { required: "სავალდებულოა" })}
            onChange={async () => {
              await trigger("deal_type");
            }}
          />
          <label
            htmlFor="is_rental"
            className="text-[14px] font-firago font-normal"
          >
            ქირავდება
          </label>
        </div>
      </div>
      {errors.deal_type && (
        <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>{errors.deal_type.message}</p>
          </div>
        </span>
      )}
    </div>
  );
};

export default RealEstateType;
