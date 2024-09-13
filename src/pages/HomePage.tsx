import FilterSection from "../components/homePageComponents/FilterSection";
import { useGetRealEstates } from "../hooks/useGetRealEstates";
import CardComponent from "../components/homePageComponents/CardComponent";

const HomePage = () => {
  const { data, isPending } = useGetRealEstates();
  if (isPending) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center flex-col mt-[96px]">
      <FilterSection />
      <div className="w-full mt-[29px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
        {data.length === 0 ? (
          <p>No real estate listings found.</p>
        ) : (
          data.map((realEstate: { id: string }) => (
            <CardComponent key={realEstate.id} realEstate={realEstate} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
