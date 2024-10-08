import { AgentInterface } from "../../types/types";
import ContactInfo from "./ContactInfo";
import { Avatar } from "@nextui-org/avatar";

const AgentInfoSection = ({ agent }: { agent: AgentInterface }) => {
  return (
    <div className="w-[503px] border-[1px] border-[#DBDBDB] rounded-[8px] p-8 flex justify-center items-start flex-col mt-[40px] gap-[20px]">
      <div className="w-full flex justify-start items-center gap-4">
        <Avatar
          src={agent.avatar}
          alt={agent.name}
          fallback
          className="w-[72px] h-[72px] object-cover rounded-full"
        />
        <div className="flex items-start justify-center flex-col gap-2">
          <p className="leading-[19.2px] font-firago font-normal text-[16px] text-[#021526]">
            {agent.name}
          </p>
          <p className="leading-[16.8px] font-firago font-normal text-[14px] text-[#676E76]">
            აგენტი
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <ContactInfo icon="/icons/Shape.png" contact={agent.email} />
        <ContactInfo icon="/icons/Vector2.png" contact={agent.phone} />
      </div>
    </div>
  );
};

export default AgentInfoSection;
