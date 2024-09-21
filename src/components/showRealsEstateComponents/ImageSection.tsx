import { Image } from "@nextui-org/image";

const ImageSection = ({
  image,
  is_rental,
}: {
  image: string;
  is_rental: number;
}) => (
  <div className="flex-1 relative">
    <div className="absolute z-20 top-[23px] left-[30px] p-[6px] bg-[#021526]/50 w-auto h-auto rounded-[15px] text-center">
      <span className="text-[#ffffff] leading-[14.4px] font-firago font-medium">
        {is_rental === 0 ? "ქირავდება" : "იყიდება"}
      </span>
    </div>
    <Image
      src={image}
      loading="lazy"
      fallbackSrc="https://via.placeholder.com"
      radius="none"
      alt={"image"}
      className="max-w-[839px] h-[670px] rounded-t-[14px] object-cover z-0"
    />
  </div>
);

export default ImageSection;
