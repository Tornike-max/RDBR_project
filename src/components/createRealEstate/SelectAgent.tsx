import { useState } from "react";
import { FieldErrors, UseFormTrigger, UseFormSetValue } from "react-hook-form";
import { CreateRealEstateInterface } from "../../types/types";
import { IoChevronDown } from "react-icons/io5";
import { HiMiniCheck, HiOutlinePlusCircle } from "react-icons/hi2";

type SelectAgentTypes = {
  errors: FieldErrors<CreateRealEstateInterface>;
  agents: { id: number; name: string }[];
  setIsAgentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: UseFormTrigger<CreateRealEstateInterface>;
  setValue: UseFormSetValue<CreateRealEstateInterface>;
};

const SelectAgent = ({
  errors,
  agents,
  setIsAgentModalOpen,
  trigger,
  setValue,
}: SelectAgentTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgentName, setSelectedAgentName] =
    useState<string>("აირჩიეთ აგენტი");

  const handleSelectAgent = (id: number, name: string) => {
    setSelectedAgentName(name);
    setIsOpen(false);
    setValue("agent_id", id, { shouldValidate: true });
    trigger("agent_id");
  };

  return (
    <div className="w-full flex justify-between items-center gap-[20px] relative">
      <div className="max-w-[384px] w-full flex justify-center items-start flex-col gap-2">
        <h3 className="font-helvatica font-medium text-[16px] leading-[19.54px] text-[#1A1A1F]">
          აგენტი
        </h3>
        <label className="font-firago font-medium text-[14px] leading-[16.8px] text-[#021526]">
          აირჩიე
        </label>

        <div
          className={`relative w-full rounded-t-[6px] ${
            isOpen ? "rounded-b-none" : "rounded-b-[6px]"
          } border-[1px] ${
            errors.agent_id ? "border-[#F93B1D]" : "border-[#808a93]"
          } p-[10px] cursor-pointer flex justify-between items-center`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedAgentName}</span>
          <IoChevronDown
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isOpen && (
          <ul className="absolute left-0 right-0 top-[95px] w-[384px] h-[209px] bg-white border-[1px] border-[#808a93] rounded-b-[6px] overflow-y-auto z-20 shadow-lg">
            <li
              onClick={() => setIsAgentModalOpen(true)}
              className="p-[10px] w-full font-[400] text-[14px] leading-[16.8px] text-[#021526] cursor-pointer flex items-center justify-start gap-[10px]  border-b-[1px] border-[#808a93]"
            >
              <HiOutlinePlusCircle className="w-[20px] h-[20px] text-[#2D3648] text-lg" />
              დაამატე აგენტი
            </li>

            {agents?.map((agent: { id: number; name: string }) => (
              <li
                key={agent.id}
                onClick={() => handleSelectAgent(agent.id, agent.name)}
                className="p-[10px] hover:bg-gray-200 cursor-pointer flex items-center justify-start border-b-[1px] border-[#808a93] font-[400] text-[14px] leading-[16.8px] text-[#021526]"
              >
                {agent.name}
              </li>
            ))}
          </ul>
        )}

        {errors.agent_id && (
          <span className="text-[12px] leading-[14.4px] font-[400] text-[#F93B1D]">
            <div className="w-full flex justify-start items-center gap-1">
              <HiMiniCheck className="text-xl" />
              <p>{errors.agent_id.message}</p>
            </div>
          </span>
        )}

        {!errors.agent_id && selectedAgentName !== "აირჩიეთ აგენტი" && (
          <div className="w-full flex justify-start items-center gap-1 font-[400] text-[14px] text-green-500 leading-[16.8px]">
            <HiMiniCheck className="text-xl" />
            <p>აგენტი დამატებულია</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAgent;
