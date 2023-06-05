import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Post from "../Post/Post";
import Modal from "../Modal/Modal";
import ModalFunctions from "../Modal/ModalFunction";
import {
  GlobalContext,
  GlobalDispatchContext,
} from "../../State/Context/GlobalContext";
import { db } from "../../Firebase/Config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ProfileView from "../Profile/ProfileView";
import Sidebar from "../Sidebar/Sidebar";
import "./Feed.css"; // Import a CSS file to define the media query

const Feed = () => {
  const { isPostModalOpen } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);
  const closeModal = () => {
    dispatch({
      type: "SET_IS_POST_MODAL_OPEN",
      payload: {
        isPostModalOpen: false,
      },
    });
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  useEffect(() => {
    setLoading(true);
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => doc.data());
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full h-full bg-[#FAFAFA]">
      <Header />
      <Modal closeModal={closeModal} isOpen={isPostModalOpen}>
        <ModalFunctions closeModal={closeModal} />
      </Modal>

      <div className="w-full gap-6 mt-10 py-10 flex justify-between">
        <section className="w-1/4">
          <ProfileView />
        </section>
        <section className="w-2/4 items-center">
          <section className="flex flex-col gap-y-6 w-auto">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </section>
        </section>
        <section className="w-1/4">
          <Sidebar />
        </section>
      </div>
    </div>
  );
};

export default Feed;
