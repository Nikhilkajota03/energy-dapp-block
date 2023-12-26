import React from "react";
import Trading from "./Trading";
import Solution from "./Solution";
import blockChain from "../image/blockChain_2.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";

const Herosection = () => {
  const { user } = useSelector((state) => state.users); // Extracting user from the Redux state

  const navigate = useNavigate();

  return (
    <>
      <section className="bg-purple-900   bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5  w-full h-full ">
        <div className="text-white py-20">
          <div className="container  flex flex-col gap-14 justify-center md:flex-row items-center my-12  md:my-24">
            <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
              <h1 className="text-3xl md:text-7xl font-extrabold p-2 text-yellow-300 tracking-loose">
                GridPulse
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold leading-relaxed md:leading-snug mb-2">
                BlockChain : Energy Trading
              </h2>
              <p className="text-2xl md:text-xl text-gray-50 mb-4">
                Blockchain energy trading transforms energy markets, offering
                efficiency and sustainability. It simplifies energy
                transactions, empowering users to contribute to a cleaner,
                decentralized energy future.
              </p>
              <a
                href="#"
                onClick={() => {
                  if (!user) {
                    message.error("please login or register first");
                  } else {
                    navigate("/market");
                  }
                }}
                className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
              >
                Explore Now
              </a>
            </div>
           
           
          </div>
        </div>
        <Trading />
      </section>
    </>
  );
};

export default Herosection;
