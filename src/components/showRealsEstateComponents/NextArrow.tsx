import React from "react";

interface ArrowProps {
  onClick?: () => void;
}

export const NextArrow: React.FC<ArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next"
      onClick={onClick}
      style={{ right: "10px", zIndex: 1 }}
    >
      <img src="/icons/arrowRight.png" alt="next-arrow" />
    </div>
  );
};
