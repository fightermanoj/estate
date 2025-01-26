import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="md:text-7xl text-4xl text-center text-white font-extrabold p-5">
        - E'STATE -
      </h1>
      <h2 className="text-white text-center">
        Estate Surveillance and TRACKING for Advanced Transformation
        and Engineering
      </h2>
      <div className="flex flex-col md:inlistify-center items-center">
        <div className="md:w-1/2 p-5">
          <p className="text-white text-justify">
            E'STATE is a web-based application that allows users to monitor and
            track the progress of construction projects in real-time. The
            application is designed to provide a comprehensive overview of the
            construction site, including the location of equipment, materials,
            and workers. Users can view 3D models of the construction site,
            access project documentation, and communicate with other team
            members.
          </p>
        </div>
        <div className="flex justify-center flex-wrap md:w-1/2 p-5 gap-2">
          <Link
            to={"/chat"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="https://picsum.photos/200"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae inventore, eos repellat dolorem eveniet, dicta cum
                assumenda ad deleniti voluptatum deserunt laborum numquam
                quaerat eum!
              </p>
            </div>
          </Link>
          <Link
            to={"/spatial"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="https://picsum.photos/300"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae inventore, eos repellat dolorem eveniet, dicta cum
                assumenda ad deleniti voluptatum deserunt laborum numquam
                quaerat eum!
              </p>
            </div>
          </Link>
          <Link
            to={"/3d"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="https://picsum.photos/400"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae inventore, eos repellat dolorem eveniet, dicta cum
                assumenda ad deleniti voluptatum deserunt laborum numquam
                quaerat eum!
              </p>
            </div>
          </Link>
          <Link
            to={"/monitor"}
            className="w-[49%] relative  overflow-hidden rounded-lg"
          >
            <img
              src="https://picsum.photos/600"
              alt="construction"
              className="w-full object-cover rounded-lg basis-[49%] hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute h-[50%] bottom-0 pb-2 pl-2 bg-gradient-to-b from-white/50 to-black/50 backdrop-blur-xs">
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae inventore, eos repellat dolorem eveniet, dicta cum
                assumenda ad deleniti voluptatum deserunt laborum numquam
                quaerat eum!
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
