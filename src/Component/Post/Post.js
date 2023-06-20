import React, { useState, useEffect, useRef, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RxFace } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FcComments } from "react-icons/fc";
import { FcShare } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import moment from "moment";
import { auth, db } from "../../Firebase/Config";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { GlobalContext } from "../../State/Context/GlobalContext";

const Post = ({
  id,
  image,
  username,
  caption,
  createdAt,
  likesCount,
}) => {
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);
  const [userProfileImage, setUserProfileImage] = useState("");
  
  let formattedDate = "";
  if (createdAt) {
    const dateObj = createdAt.toDate();
    formattedDate = moment(dateObj).format("YYYY-MM-DD");
  }

  const handleLikes = async () => {
    const postLike = {
      postId: id,
      userId: auth.currentUser.uid,
      username: username,
    };
    const likeRef = doc(db, `likes/${id}_${auth.currentUser.uid}`);
    const postRef = doc(db, `posts/${id}`);
    let updateLikesCount;

    if (like) {
      await deleteDoc(likeRef);
      if (likesCount) {
        updateLikesCount = likesCount - 1;
      } else {
        updateLikesCount = 0;
      }
      await updateDoc(postRef, {
        likesCount: updateLikesCount,
      });
    } else {
      await setDoc(likeRef, postLike);
      if (likesCount) {
        updateLikesCount = likesCount + 1;
      } else {
        updateLikesCount = 1;
      }
      await updateDoc(postRef, {
        likesCount: updateLikesCount,
      });
    }
  };

  useEffect(() => {
    const likeRef = collection(db, "likes");
    const likesQuery = query(
      likeRef,
      where("postId", "==", id),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribeLike = onSnapshot(likesQuery, (snapshot) => {
      const liked = snapshot.docs.map((doc) => doc.data());
      if (liked.length !== 0) {
        setLike(true);
      } else {
        setLike(false);
      }
    });

    const commentRef = collection(db, `post/${id}/comments`);
    const commentQuery = query(commentRef, orderBy("createdAt", "desc"));
    const unsubscribeComments = onSnapshot(commentQuery, (snapshot) => {
      const comments = snapshot.docs.map((doc) => doc.data());
      setComments(comments);
    });

    const getUserProfileImage = async () => {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setUserProfileImage(userData.profileImage);
      }
    };

    getUserProfileImage();

    return () => {
      unsubscribeLike();
      unsubscribeComments();
    };
  }, [id, username]);

  const comment = useRef(null);
  const { user } = useContext(GlobalContext);
  const handleComment = async (e) => {
    e.preventDefault();

    const commentData = {
      id: uuidv4(),
      username: user.username,
      comment: comment.current.value,
      createdAt: serverTimestamp(),
    };
    comment.current.value = "";
    const commentRef = doc(db, `post/${id}/comments/${commentData.id}`);
    await setDoc(commentRef, commentData);
  };

  return (
    <div className="flex flex-col w-full shadow-md rounded-md">
      <div className="flex items-center justify-between w-full p-2 ">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-10 h-10 border-2 border-white rounded-full">
            <img
              src={userProfileImage}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="font-semibold">{username}</div>
        </div>
        <div className="w-4 select-none">
          <BsThreeDots className="text-lg" />
        </div>
      </div>
      <div className="h-80 flex items-center justify-center aspect-square">
        <img
          src={image}
          layout="fill"
          alt="Loading Images"
          className="w-auto h-80 object-contain border-2 shadow-xl rounded-lg"
        />
      </div>
      <div className="flex justify-between p-2 text-lg ">
        <div className="flex space-x-2">
          <div onClick={handleLikes}>
            {like ? (
              <AiFillHeart
                size={25}
                className="cursor-pointer text-red-500 hover:text-red-500/50"
              />
            ) : (
              <AiOutlineHeart
                size={25}
                className="text-black cursor-pointer"
              ></AiOutlineHeart>
            )}
          </div>
          <div>
            <FcComments size={25} className="cursor-pointer text-black" />
          </div>
          <div>
            <FcShare size={25} className="cursor-pointer text-black" />
          </div>
        </div>
        <div>
          <FcBookmark size={25} className="cursor-pointer text-black" />
        </div>
      </div>
      <div className="px-2">{likesCount ? `${likesCount} likes` : null}</div>
      <div className="px-2">{caption}</div>
      <div className="p-2 ">
        <div className="flex flex-col space-y-1">
          {comments.map((commentData) => (
            <div key={commentData.id} className="flex space-x-2">
              <div className="font-medium">{commentData.username}</div>
              <div>{commentData.comment}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-2 text-sm font-semibold italic">{formattedDate}</div>
      <div className="flex item-center px-2 space-x-3 mt-1 py-4 border-t border-gray-200">
        <div>
          <RxFace className="text-xl" />
        </div>
        <form onSubmit={handleComment} className="flex w-full px-2">
          <div className="w-full">
            <input
              type="text"
              name={`comment ${id}`}
              id={`comment ${id}`}
              placeholder="Add a comment..."
              className="w-full outline-none bg-white"
              ref={comment}
            ></input>
          </div>
          <div>
            <button className="text-blue-600 font-semibold  px-1">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
