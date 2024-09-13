import { useGetRealEstate } from "../hooks/ugeGetRealEstate";

const ShowRealEstate = () => {
  const { data, isPending } = useGetRealEstate();

  if (isPending) return <p>Loading...</p>;
  console.log(data);
  return <div>ShowRealEstate</div>;
};

export default ShowRealEstate;
