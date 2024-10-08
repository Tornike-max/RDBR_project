import { formatArea, formatCurrency } from "../../functions/functions";
import { RealEstate } from "../../types/types";

const DetailsSection = ({ data }: { data: RealEstate }) => (
  <div className="w-[503px] flex flex-col justify-center items-start">
    <div className="w-[410px] flex items-start justify-center flex-col gap-[16px]">
      <h2 className="text-[48px] leading-[57.6px] font-firago font-bold mb-[10px]">
        {formatCurrency(data.price)}
      </h2>
      <DetailItem
        icon="/icons/Icon.png"
        text={`${data.city.name} ${data.address}`}
      />
      <DetailItem
        icon="/icons/Vector.png"
        text={`ფართი ${formatArea(data.area)} `}
      />
      <DetailItem icon="/icons/bed.png" text={`საძინებელი ${data.bedrooms}`} />
      <DetailItem
        icon="/icons/Vector1.png"
        text={`საფოსტო ინდექსი ${data.zip_code}`}
      />
    </div>
  </div>
);

const DetailItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="text-[24px] leading-[28.8px] font-firago font-normal text-[#808A93] flex items-center gap-2">
    <img src={icon} alt="icon" className="w-[22px] h-[22px]" />
    <span>{text}</span>
  </div>
);

export default DetailsSection;
