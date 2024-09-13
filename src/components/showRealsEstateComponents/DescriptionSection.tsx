const DescriptionSection = ({ description }: { description: string }) => (
  <div className="w-[503px] flex justify-center items-start flex-col mt-[40px]">
    <p className="leading-[26px] text-[16px] font-[400] text-[#808A93]">
      {description}
    </p>
  </div>
);

export default DescriptionSection;
