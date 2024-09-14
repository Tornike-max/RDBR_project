interface ArrowProps {
  onClick?: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev"
      onClick={onClick}
      style={{ left: "10px", zIndex: 1 }}
    >
      <img src="/icons/arrowLeft.png" alt="prev-arrow" />
    </div>
  );
};
