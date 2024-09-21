import {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { HiMiniCheck } from "react-icons/hi2";

type DescriptionTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
  watch: UseFormWatch<CreateRealEstateInterface>;
};
const Description = ({
  register,
  errors,
  trigger,
  watch,
}: DescriptionTypes) => {
  return (
    <div className="w-full flex justify-between items-center gap-[20px]">
      <div className="w-full flex justify-center items-start flex-col gap-2">
        <label className="font-helvatica font-medium text-[14px] leading-[16.8px] text-[#021526] ">
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
          className={`w-full relative m-auto rounded-[8px] border-[1px] ${
            errors.description ? "border-[#F93B1D]" : "border-[#808A93]"
          }  h-[120px] flex justify-center items-center p-[10px]`}
        ></textarea>
        {!watch("description") && !errors.description && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>მინიმუმ 5 სიტყვა</p>
          </div>
        )}

        {watch("description") && !errors.description && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>მინიმუმ 5 სიტყვა</p>
          </div>
        )}

        {errors.description && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
            <HiMiniCheck className="text-xl" />
            <p>{errors.description.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
