import { Spinner } from "@nextui-org/spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0">
      <Spinner color="warning" size="lg" label="იტვირთება" />
    </div>
  );
};

export default Loader;
