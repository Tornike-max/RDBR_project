import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";

type DescriptionTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
};
const Description = ({ register, errors, trigger }: DescriptionTypes) => {
  return (
    <div className="w-full flex justify-between items-center gap-[20px]">
      <div className="w-full flex justify-center items-start flex-col gap-2">
        <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526] ">
          აღწერა *
        </label>
        <textarea
          {...register("description", {
            required: "სავალდებულოა",
            validate: {
              minWords: (value) => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount >= 5 || "მინიმუმ 5 სიტყვა";
              },
            },
          })}
          onBlur={() => trigger("description")}
          className="w-full relative m-auto rounded-[8px] border-[1px] border-[#808A93] h-[120px] flex justify-center items-center p-[10px]"
        ></textarea>
        <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-[#021526] leading-[16.8px]">
          <img src="/icons/check.png" />
          <p>მინიმუმ 5 სიტყვა</p>
        </div>
        {errors.description && (
          <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Description;
