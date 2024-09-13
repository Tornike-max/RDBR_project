import { useState } from "react";
import { useGetRealEstates } from "../../hooks/useGetRealEstates";
import { Property } from "../../types/types";
import CardComponent from "../homePageComponents/CardComponent";

const CarouselComponent = () => {
  const { data, isPending } = useGetRealEstates();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  if (isPending) return <p>Loading...</p>;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - itemsPerPage : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex items-center justify-center gap-2">
      <button onClick={prevSlide} className="">
        <img src="/icons/arrowLeft.png" alt="arrow-left" />
      </button>

      <div className="w-full flex justify-center items-center overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            width: `${(data.length / itemsPerPage) * 100}%`,
          }}
        >
          {data.map((realEstate: Property) => (
            <div key={realEstate.id} className="w-1/4 flex-shrink-0 p-2">
              <CardComponent realEstate={realEstate} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={nextSlide} className="">
        <img src="/icons/arrowRight.png" alt="arrow-left" />
      </button>
    </div>
  );
};

export default CarouselComponent;
