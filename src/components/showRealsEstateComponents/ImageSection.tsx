import { Image } from "@nextui-org/image";

const ImageSection = ({
  image,
  is_rental,
}: {
  image: string;
  is_rental: number;
}) => (
  <div className="flex-1 relative">
    <p className="absolute z-20 top-[20px] left-[20px] p-[6px] opacity-70 bg-[#021526]/50 w-auto h-auto rounded-[15px] text-center">
      <span className="text-[#ffffff] leading-[14.4px] font-[500] ">
        {is_rental === 0 ? "ქირავდება" : "იყიდება"}
      </span>
    </p>
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
