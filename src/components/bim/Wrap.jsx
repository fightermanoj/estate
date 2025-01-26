import React from "react";
import ThreeD from "./ThreeD";
import HugFace from "./HugFace";

const Wrap = () => {
  return (
    <div className="w-screen h-screen justify-center items-center flex md:flex-row flex-col">
      <div className="w-fit flex flex-col justify-center items-center p-5">
        <p
          className="text-white text-center p-10 cursor-pointer hover:underline hover:text-blue-500 border-2 border-white rounded-2xl hover:border-blue-500"
          onClick={() =>
            window.open(
              "https://huggingface.co/spaces/fardeenKhadri/estate",
              "_blank"
            )
          }
        >
          Find the Model deployment here
        </p>
      </div>
      <ThreeD />
    </div>
  );
};

export default Wrap;
