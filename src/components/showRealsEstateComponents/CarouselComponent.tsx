import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponent from "../homePageComponents/CardComponent";
import { RealEstate } from "../../types/types";
import { NextArrow } from "./NextArrow";
import { PrevArrow } from "./PrevArrow";

const CarouselComponent = ({ realEstates }: { realEstates: RealEstate[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {realEstates.map((realEstate: RealEstate) => (
          <CardComponent realEstate={realEstate} />
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
