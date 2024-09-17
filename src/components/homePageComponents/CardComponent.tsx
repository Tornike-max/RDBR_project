import { useNavigate } from "react-router-dom";
import { RealEstate } from "../../types/types";
import { Image } from "@nextui-org/image";

const CardComponent = ({ realEstate }: { realEstate: RealEstate }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    if (!id) return;
    navigate(`/realEstate/${id}`);
  };
  return (
    <div
      className="cursor-pointer"
      onClick={() => handleNavigate(realEstate.id)}
    >
      <div className="max-w-[384px] w-full h-[307px] rounded-t-[14px] relative">
        <p className="absolute z-20 top-[20px] left-[20px] p-[6px] bg-[#021526]/50 w-auto h-auto rounded-[15px] text-center">
          <span className="text-[#ffffff] leading-[14.4px] font-[500]">
            {realEstate.is_rental === 0 ? "ქირავდება" : "იყიდება"}
          </span>
        </p>

        <Image
          isZoomed
          src={realEstate.image}
          fallbackSrc="https://via.placeholder.com"
          alt="Real Estate"
          loading="lazy"
          isBlurred
          radius="none"
          className="w-[384px] h-[307px] object-fit: cover rounded-t-[14px] shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 z-10"
        />
      </div>
      <div className="h-[148px] max-w-[384px] w-full bg-[#FFFFFF] border-[#DBDBDB] border-l-[1px] border-b-[1px] border-r-[1px] px-[22px] py-[25px] rounded-b-[14px]">
        <div className="w-full flex items-start justify-center flex-col gap-[6px]">
          <h3 className="font-[700] text-[28px] leading-[33.6px]">
            {realEstate.price} ₾
          </h3>
          <div className="w-full flex items-center justify-start gap-2">
            <img
              className="w-[14px] h-[16.9px]"
              src="/icons/Icon.png"
              alt="location-icon"
            />
            <span className="text-[16px] font-[400] leading-[19.2px] text-[#021526B2]/70">
              {realEstate.address}
            </span>
          </div>
        </div>
        <div className="mt-[20px] w-auto h-auto flex justify-start items-center gap-x-[32px]">
          <div className="flex items-center justify-start gap-1">
            <img
              className="w-[24px] h-[24px]"
              src="/icons/bed.png"
              alt="bed-icon"
            />
            <span className="text-[16px] font-[400] leading-[19.2px] text-[#021526B2]/70 text-start">
              {realEstate.bedrooms}
            </span>
          </div>

          <div className="flex items-center justify-start gap-1">
            <img
              className="w-[24px] h-[24px]"
              src="/icons/Vector.png"
              alt="vector-icon"
            />
            <span className="text-[16px] font-[400] leading-[19.2px] text-[#021526B2]/70 text-start">
              {realEstate.area}
            </span>
          </div>

          <div className="flex items-center justify-start gap-1">
            <img
              className="w-[24px] h-[24px]"
              src="/icons/Vector1.png"
              alt="vector-icon"
            />
            <span className="text-[16px] font-[400] leading-[19.2px] text-[#021526B2]/70 text-start">
              {realEstate.zip_code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
