import React, { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsBookmarks } from "react-icons/bs";
import { FaRegShareSquare } from "react-icons/fa";
import { CgScreen } from "react-icons/cg";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineSetting } from "react-icons/ai";
import { GlobalContext, GlobalDispatchContext } from "../../State/Context/GlobalContext";

const ProfileView = () => {

  const dispatch = useContext(GlobalDispatchContext)

  const handleClick = () => {
    dispatch({
      type:'SET_IS_POST_MODAL_OPEN',
      payload:{
        isPostModalOpen: true,
      },
    });
  };

  const { user } = useContext(GlobalContext);
  if (!user) {
    return <div>Loading user profile...</div>;
  }



  return (
    <div className="w-1/5 p-4 fixed h-screen bg-gradient-to-b  from-blue-200 to-pink-200 rounded-tr-3xl rounded-tl-3xl ">
      <div className="w-full p-4 flex flex-col items-center justify-start">
        <div className="w-20 h-20  bg-gradient-to-r p-[5px] from-[#120fc9] to-[#ff0080] rounded-full">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="mt-2  text-center">
          <div className="text-black font-semibold text-xl">
            {user.fullname}
          </div>
          <div className="text-gray-600 italic">@{user.username}</div>
        </div>
      </div>
      <div className="h-[0.8px]  w-full bg-slate-400" />
      <div className="flex flex-col py-2 space-y-5 px-6 mt-1">
        <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer ">
          <AiOutlineHome size={25} />
          Feed
        </div>
        <div  onClick={handleClick} className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
          <VscFileSubmodule size={25} />
          Add Post
        </div>
        <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
          <BsBookmarks size={25} />
          My Favorites
        </div>
        <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
          <FaRegShareSquare size={25} />
          Direct
        </div>
        <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
          <CgScreen size={25} />
          IG Tv
        </div>
        <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
          <ImStatsBars size={25} />
          Stats
        </div>
        <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
          <AiOutlineSetting size={25} />
          Setting
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
