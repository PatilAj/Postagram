import React, { useContext} from "react";
import { AiOutlineHome } from "react-icons/ai";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsBookmarks } from "react-icons/bs";
import { FaRegShareSquare } from "react-icons/fa";
import { CgScreen } from "react-icons/cg";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineSetting } from "react-icons/ai";
import { GlobalContext, GlobalDispatchContext } from "../../State/Context/GlobalContext";

const ProfileView = () => {
  const dispatch = useContext(GlobalDispatchContext);
  const { user } = useContext(GlobalContext);

  const handleClick = () => {
    dispatch({
      type: "SET_IS_POST_MODAL_OPEN",
      payload: {
        isPostModalOpen: true,
      },
    });
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }


  return (
    <div className="fixed h-screen ml-5 left-0 w-1/5 md:w-1/5 bg-gradient-to-b from-blue-200 to-pink-200 rounded-tr-3xl rounded-tl-3xl" style={{ zIndex:"0"}}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-center py-8">
          <div className="w-20 h-20 bg-gradient-to-r p-[5px] from-[#120fc9] to-[#ff0080] rounded-full">
            <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-black font-semibold text-xl">{user.fullname}</div>
          <div className="text-gray-600 italic text-sm">{user.username}</div>
        </div>
        <div className="items-center flex flex-col mt-3">
          <div className="space-y-2">
            <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <AiOutlineHome size={25} />
              <span>Feed</span>
            </div>
            <div onClick={handleClick} className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <VscFileSubmodule size={25} />
              <span>Add Post</span>
            </div>
            <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <BsBookmarks size={25} />
             <span>My Favorites</span>
            </div>
            <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <FaRegShareSquare size={25} />
              <span>Direct</span>
            </div>
            <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <CgScreen size={25} />
              <span>IG Tv</span>
            </div>
            <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <ImStatsBars size={25} />
              <span>Stats</span>
            </div>
            <div className="flex items-center gap-x-6 p-1 text-black hover:text-white/100 hover:bg-black/30 transition rounded cursor-pointer">
              <AiOutlineSetting size={25} />
              <span>Setting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
