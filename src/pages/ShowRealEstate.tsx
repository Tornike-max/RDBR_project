import { useNavigate } from "react-router-dom";
import ImageSection from "../components/showRealsEstateComponents/ImageSection";
import DetailsSection from "../components/showRealsEstateComponents/DetailsSection";
import DescriptionSection from "../components/showRealsEstateComponents/DescriptionSection";
import AgentInfoSection from "../components/showRealsEstateComponents/AgentInfoSection";
import DeleteButton from "../components/showRealsEstateComponents/DeleteButton";
import CarouselComponent from "../components/showRealsEstateComponents/CarouselComponent";
import { useState } from "react";
import DeleteConfirmation from "../components/showRealsEstateComponents/DeleteConfirmation";
import { useGetRealEstate } from "../hooks/ugeGetRealEstate";

const ShowRealEstate = () => {
  const { data, isPending } = useGetRealEstate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center flex-col mt-[96px]">
      <div className="w-full flex justify-start items-center">
        <img
          onClick={() => navigate("/")}
          src="/icons/arrowLeft.png"
          alt="arrow-left"
          className="w-[32px] h-[32px] cursor-pointer"
        />
      </div>
      <div className="w-full mt-[29px] flex gap-[40px]">
        <ImageSection image={data.image} />
        <div className="flex-1 p-[20px]">
          <DetailsSection data={data} />
          <DescriptionSection description={data.description} />
          <AgentInfoSection agent={data.agent} />
          <DeleteButton setIsOpen={setIsOpen} />
        </div>
      </div>

      <div className="w-full flex justify-center items-start flex-col gap-[40px] mt-[40px]">
        <h1 className="text-[32px] text-[#021526] leading-[38.4px] font-[500]">
          ბინები მსგავს ლოკაციებზე
        </h1>
        <CarouselComponent />
      </div>
      {isOpen && (
        <DeleteConfirmation id={data.id} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default ShowRealEstate;
