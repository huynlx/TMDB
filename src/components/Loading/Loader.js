import { loadingBuffering } from "../../assets/index";
import { useMediaQuery } from "react-responsive";

const Gif = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 991.98px)",
  });
  return (
    <>
      <img
        src={loadingBuffering}
        alt="loading"
        width={isMobileDevice ? 30 : 70}
        height={isMobileDevice ? 30 : 70}
        style={style}
      />
    </>
  );
};

export default Gif;
