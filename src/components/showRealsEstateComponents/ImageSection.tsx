const ImageSection = ({ image }: { image: string }) => (
  <div className="flex-1">
    <img
      src={image}
      alt={"image"}
      className="max-w-[839px] h-[670px] rounded-t-[14px] object-cover"
    />
  </div>
);

export default ImageSection;
