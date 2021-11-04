import { loadingBuffering } from "../../assets/index";

const Gif = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  return (
    <>
      <img
        src={loadingBuffering}
        alt="loading"
        width={70}
        height={70}
        style={style}
      />
    </>
  );
};

export default Gif;
