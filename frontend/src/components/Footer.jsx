import React from "react";
import { FaYoutube } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="footer rounded-2xl h-[120px] mt-5 w-screen px-[50px] flex items-center justify-between">
        <h3 className="text-2xl">Keep Notes</h3>

        <div className="text-center text-[gray]">
          <p>
            Designed By <span className="sp-text">Saiyed Aadil</span> YouTube
            Channel
          </p>
          <p>Copy Right 2024 All Right Reserved</p>
        </div>

        <div className="text-gray">
          <p className=" font-semibold">We Are Social</p>
          <div className="flex items-center gap-1">
            <i className="p-[5px] text-[20px] cursor-pointer">
              <FaYoutube />
            </i>
            <i className="p-[5px]  text-[20px] cursor-pointer">
              <RiInstagramFill />
            </i>
            <i className="p-[5px] text-[20px] cursor-pointer">
              <ImFacebook2 />
            </i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
