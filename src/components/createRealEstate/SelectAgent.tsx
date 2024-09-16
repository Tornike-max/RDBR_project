import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";

type SelectAgentTypes = {
  register: UseFormRegister<CreateRealEstateInterface>;
  errors: FieldErrors<CreateRealEstateInterface>;
  agents: { id: number; name: string }[];
};
const SelectAgent = ({ register, errors, agents }: SelectAgentTypes) => {
  return (
    <div className="w-full flex justify-between items-center gap-[20px]">
      <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
        <label className="font-[500] text-[14px] leading-[16.8px] text-[#021526]">
          აგენტი
        </label>
        <select
          {...register("agent_id", { required: "აირჩიეთ აგენტი" })}
          className={`w-full rounded-[6px] border-[1px] ${
            errors.agent_id ? "border-[#F93B1D]" : "border-[#808a93]"
          } p-[10px]`}
        >
          <option value="">აირჩიეთ აგენტი</option>
          {agents?.map((agent: { id: number; name: string }) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        {errors.agent_id && (
          <span className=" text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
            {errors.agent_id.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectAgent;
