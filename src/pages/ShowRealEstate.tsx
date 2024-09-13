import { useNavigate } from "react-router-dom";
import { useGetRealEstate } from "../hooks/ugeGetRealEstate";
import ImageSection from "../components/showRealsEstateComponents/ImageSection";
import DetailsSection from "../components/showRealsEstateComponents/DetailsSection";
import DescriptionSection from "../components/showRealsEstateComponents/DescriptionSection";
import AgentInfoSection from "../components/showRealsEstateComponents/AgentInfoSection";
import DeleteButton from "../components/showRealsEstateComponents/DeleteButton";

const ShowRealEstate = () => {
  const { data, isPending } = useGetRealEstate();
  const navigate = useNavigate();

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center flex-col mt-[96px]">
      <div className="w-full flex justify-start items-center">
        <img
          onClick={() => navigate(-1)}
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
          <DeleteButton />
        </div>
      </div>
    </div>
  );
};

export default ShowRealEstate;
