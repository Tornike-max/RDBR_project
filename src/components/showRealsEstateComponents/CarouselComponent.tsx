import { useGetRealEstates } from "../../hooks/useGetRealEstates";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponent from "../homePageComponents/CardComponent";
import { Property } from "../../types/types";
import { NextArrow } from "./NextArrow";
import { PrevArrow } from "./PrevArrow";

const CarouselComponent = () => {
  const { data, isPending } = useGetRealEstates();

  if (isPending) return <p>Loading...</p>;

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
    <div className="w-full px-[-162px]">
      <Slider {...settings}>
        {data.map((realEstate: Property) => (
          <CardComponent realEstate={realEstate} />
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
