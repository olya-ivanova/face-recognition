import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 w-10 h-10">
      <Tilt className="Tilt br2 shadow-2" scale="1.2">
        <div className="pa3">
          <img src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
