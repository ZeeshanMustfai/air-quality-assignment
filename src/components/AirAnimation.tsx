import Lottie from "react-lottie";
import AirLottieData from "../assets/animation/air-lottie.json";
import { Header } from "semantic-ui-react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: AirLottieData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const AirAnimation = () => {
  return (
    <div className="air-assesment">
      <Header as={"h1"}>Air Quality Assesment</Header>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default AirAnimation;
