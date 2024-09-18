import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponent from "../homePageComponents/CardComponent";
import { RealEstate } from "../../types/types";
import { useRef } from "react";
import { NextArrow } from "./NextArrow"; // Your existing custom NextArrow
import { PrevArrow } from "./PrevArrow"; // Your existing custom PrevArrow

const CarouselComponent = ({ realEstates }: { realEstates: RealEstate[] }) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    cssEase: "linear",
    arrows: false,
  };

  const handlePrev = () => {
    sliderRef?.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef?.current?.slickNext();
  };

  return (
    <div className="relative w-full px-[70px]">
      <PrevArrow onClick={handlePrev} />

      <div className="max-w-[1700px] w-full mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {realEstates.map((realEstate: RealEstate) => (
            <CardComponent key={realEstate.id} realEstate={realEstate} />
          ))}
        </Slider>
      </div>

      <NextArrow onClick={handleNext} />
    </div>
  );
};

export default CarouselComponent;
