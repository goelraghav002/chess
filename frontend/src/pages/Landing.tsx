import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


const Landing = () => {

  const naviagte = useNavigate();

  return (
    <div className="bg-slate-800 h-fit md:h-screen">
      <div className="max-w-screen-lg py-20 m-auto flex flex-col-reverse md:flex-row">
        <div className="w-full p-10 text-center">
          <img src="/chessBoard.png" className="rounded-md md:w-[500px] w-[350px] m-auto" alt="" />
        </div>
        <div className="w-full md:my-auto">
          <h1 className="md:text-5xl text-3xl text-white font-mono font-bold text-center">Play Chess <br />Online <br /> on #2 Site</h1>
          <div className="text-center">
            <Button onClick={() => naviagte("/game")}>
              Play Online
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
