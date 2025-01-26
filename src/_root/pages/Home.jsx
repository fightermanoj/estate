import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex justify-center pt-5">
        <img src="/assets/images/estate.jpg" alt="estate" className="size-32" />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2">
        <img
          src="https://www.aurigo.com/wp-content/themes/aurigo/images/logo.svg"
          alt="aurigo"
          className="w-32 h-18"
        />
        <h1 className="md:text-7xl text-4xl text-center text-white font-extrabold p-5">
          - E'STATE -
        </h1>
        <img
          src="/assets/images/pragyan.png"
          alt="pragyan"
          className="w-32 h-18"
        />
      </div>
      <h2 className="text-white text-center">
        Estate Surveillance and TRACKING for Advanced Transformation
        and Engineering
      </h2>
      <div className="flex flex-col md:inlistify-center items-center">
        <div className="flex justify-center flex-wrap md:w-1/2 p-5 gap-2">
          <Link
            to={"/chat"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="/assets/images/chat.png"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out "
            />
            <div className="absolute w-full h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-black text-3xl">
                ERP Chatbot for resource management
              </p>
            </div>
          </Link>
          <Link
            to={"/spatial"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="/assets/images/omni.jpg"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out "
            />
            <div className="absolute w-full h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-black text-3xl">
                Omnipresence Surveillance and Tracking
              </p>
            </div>
          </Link>
          <Link
            to={"/3d"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="/assets/images/bim.jpg"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out "
            />
            <div className="absolute w-full h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-black text-3xl">
                BIM for visulaizing progress
              </p>
            </div>
          </Link>
          <Link
            to={"/monitor"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="/assets/images/kavacha.webp"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out "
            />
            <div className="absolute w-full h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-black text-3xl">KAVACHA - Worker Safety</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
