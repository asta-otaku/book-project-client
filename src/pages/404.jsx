import notFoundImage from "../assets/404.png";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-full min-h-screen bg-gradient-to-b from-primary to-primary/40 items-center px-8">
      <div className="bg-white flex flex-col items-center rounded-[10px] border border-[#DADCE0] z-[2] py-4 px-8 max-w-[616px]">
        <img src={notFoundImage} alt="404-page" className="md:-mb-12" />
        <p className="text-lg text-center text-[#5F7383]">
          The page you're looking for can not be found
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white py-3 px-8 my-6 text-[12px] md:text-base md:px-[140px] rounded-[5px]"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
