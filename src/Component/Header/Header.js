import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import { RiAddCircleLine } from "react-icons/ri";
import { BiCompass } from "react-icons/bi";
import Lottie from "react-lottie-player";
import InstaLogo from "../../Assests/InstaLogo.json";
import { auth } from "../../Firebase/Config";
import { signOut } from "firebase/auth";
import { GlobalDispatchContext } from "../../State/Context/GlobalContext";

const Header = () => {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const dispatch = useContext(GlobalDispatchContext);

  const handleClick = () => {
    dispatch({
      type: "SET_IS_POST_MODAL_OPEN",
      payload: {
        isPostModalOpen: true,
      },
    });
  };

  return (
    <header className="w-full h-16 items-center flex justify-around shadow-md fixed top-0 p-1 bg-white">
      <div className="text-3xl flex gap-x-2 items-center font-bold tracking-wider cursor-pointer select-none ">
        <div className="flex items-center">
          <Lottie
            play
            loop
            animationData={InstaLogo}
            className="w-[20%] h-[20%]"
          />
          <h1 className="mr-9 bg-gradient-to-r from-blue-700 via-red-600 to-fuchsia-600 text-transparent bg-clip-text">
            Postagram
          </h1>
        </div>
      </div>
      <div className="flex w-full bg-gray-100 group space-x-1 items-center group-focus:border-gray-400 rounded-lg px-2 mr-10">
        <label htmlFor="search" className="">
          <BsSearch className="text-lg text-gray-400" />
        </label>
        <input
          className="bg-gray-100 px-2 py-1 outline-none w-full placeholder:text-sm hover:bg-transparent focus:bg-transparent rounded-sm transition"
          type="search"
          name="search"
          id="search"
          placeholder="Search"
        ></input>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="flex space-x-5 ">
          <AiOutlineHome
            className="text-black hover:text-white/100 hover:bg-black/60 transition rounded cursor-pointer"
            size={25}
          />
          <RiMessengerLine
            className="text-black hover:text-white hover:bg-black/60  transition rounded cursor-pointer"
            size={25}
          />
          <RiAddCircleLine
            onClick={handleClick}
            className="text-black hover:text-white hover:bg-black/60  transition rounded cursor-pointer"
            size={25}
          />
          <AiOutlineHeart
            className="text-black hover:text-white hover:bg-black/60  transition rounded cursor-pointer"
            size={25}
          />
          <BiCompass
            className="text-black hover:text-white hover:bg-black/60  transition rounded cursor-pointer"
            size={25}
          />
        </div>
        <button
          onClick={handleLogout}
          className="py-1 h-4/5 px-6 text-white rounded text-sm font-semibold active:scale-95 transform transition bg-red-500 hover:bg-red-600 disabled:bg-opacity-50 disabled:scale-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
