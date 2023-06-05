import React, { useContext,useState} from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import { RiAddCircleLine } from "react-icons/ri";
import { BiCompass } from "react-icons/bi";
import { auth } from "../../Firebase/Config";
import { signOut } from "firebase/auth";
import { GlobalDispatchContext } from "../../State/Context/GlobalContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
    <nav className="bg-blue-400 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
        <div className="flex-shrink-0">
              <h1 className=" font-bold text-2xl  bg-gradient-to-r from-blue-700 via-red-600 to-fuchsia-600 text-transparent bg-clip-text">Postagram</h1>
            </div>
          <div className="flex-1 flex justify-center px-5 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-[80%] lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <BsSearch/>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:items-stretch sm:justify-end">  
            <div className="hidden sm:block sm:ml-6">
              <div className="flex ">
                <AiOutlineHome
                  className="px-3 py-2 text-sm rounded-md text-black hover:text-white/100 hover:bg-black/60 transition  cursor-pointer"
                  size={50}
                />
               
               <RiMessengerLine
                  className="px-3 py-2 text-sm rounded-md text-black hover:text-white/100 hover:bg-black/60 transition  cursor-pointer"
                  size={50}
                />
                <RiAddCircleLine
                  onClick={handleClick}
                  className="px-3 py-2 text-sm rounded-md text-black hover:text-white/100 hover:bg-black/60 transition  cursor-pointer"
                  size={50}
                />
               <AiOutlineHeart
                  className="px-3 py-2 text-sm rounded-md text-black hover:text-white/100 hover:bg-black/60 transition  cursor-pointer"
                  size={50}
                />
                 <BiCompass
                  className="px-3 py-2 text-sm rounded-md text-black hover:text-white/100 hover:bg-black/60 transition  cursor-pointer"
                  size={50}
                />
                <button  onClick={handleLogout} className="px-3 ml-1 mt-2 h-9 text-white rounded-md text-sm font-semibold active:scale-95 transform transition bg-red-500 hover:bg-red-600 disabled:bg-opacity-50 disabled:scale-100">Logout</button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={handleToggle}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
          <div className="flex items-center gap-x-1 p-1 px-3 font-bold text-md rounded-md text-black hover:text-white/100 hover:bg-black/60 transition cursor-pointer">
              <AiOutlineHome size={25} />
              <span>Home</span>
            </div>
            <div className="flex items-center gap-x-1 p-1 px-3 font-bold text-md rounded-md text-black hover:text-white/100 hover:bg-black/60 transition cursor-pointer">
              <RiMessengerLine size={25} />
              <span>Chat</span>
            </div>
            <div  onClick={handleClick} className="flex items-center gap-x-1 p-1 px-3 font-bold text-md rounded-md text-black hover:text-white/100 hover:bg-black/60 transition cursor-pointer">
              <RiAddCircleLine size={25} />
              <span>Post</span>
            </div>
            <div className="flex items-center gap-x-1 p-1 px-3 font-bold text-md rounded-md text-black hover:text-white/100 hover:bg-black/60 transition cursor-pointer">
              <AiOutlineHeart size={25} />
              <span>Likes</span>
            </div>
            <div className="flex items-center gap-x-1 p-1 px-3 font-bold text-md rounded-md text-black hover:text-white/100 hover:bg-black/60 transition cursor-pointer">
              <BiCompass size={25} />
              <span>Feed</span>
            </div>
          <button  onClick={handleLogout} className="ml-3 px-10 h-8 text-white rounded text-sm font-semibold active:scale-95 transform transition bg-red-500 hover:bg-red-600 disabled:bg-opacity-50 disabled:scale-100">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
