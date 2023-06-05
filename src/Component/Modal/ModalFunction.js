import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  GlobalContext,
} from "../../State/Context/GlobalContext";
import { db, storage } from "../../Firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const ModalFunctions = ({ closeModal }) => {

  const [file, setFile] = useState("");
  const [media, setMedia] = useState({
    src: "",
    isUploading: false,
    caption: "",
  });

  useEffect(() => {
    const reader = new FileReader();
    const handleEvent = (event) => {
      switch (event.type) {
        case "load":
          setMedia((prev) => ({
            ...prev,
            src: reader.result,
          }));
          break;
        case "error":
          return toast.error("File Loading Failed");
        default:
          return;
      }
    };

    if (file) {
      reader.addEventListener("load", handleEvent);
      reader.addEventListener("error", handleEvent);
      reader.readAsDataURL(file);
    }
    return () => {
      reader.removeEventListener("load", handleEvent);
      reader.removeEventListener("error", handleEvent);
    };
  }, [file]);

  const currentImage = useRef(null);
  const { user } = useContext(GlobalContext);

  const handlePostMedia = async (url) => {
    const postId = uuidv4();
    const postRef = doc(db, "posts", postId);
    const post = {
      id: postId,
      image: url,
      caption: media.caption,
      username: user.username,
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(postRef, post);
    } catch (error) {
      console.error(error);
      toast.error("Post not found!!");
    }
  };

  const uploadPost = async () => {
    if (!file) return toast.error("Please select a valid file");
    setMedia((prev) => ({ ...prev, isUploading: true }));

    const toastId = toast.loading("Uploading, please wait...");
    const postName = `posts/${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, postName);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      await handlePostMedia(url);
      toast.success("Post uploaded successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    } finally {
      setMedia({
        src: "",
        isUploading: false,
        caption: "",
      });
      setFile("");
      closeModal();
    }
  };

  const removePost = () => {
    setFile("");
    currentImage.current.src = "";
  };

  return (
    <div className="w-100 h-100 max-w-xl max-h-[60vh] flex flex-col items-center ">
      <div className="w-full py-1 text-xl text-center font-semibold border-b border-black">
        Create New Post
      </div>
      <div className="pt-3 flex items-center justify-center w-full h-full">
        {!file ? (
          <>
            <label
              htmlFor="post"
              className="bg-[#0095F6] py-3 px-3 text-white active:scale-95 transform transition w-10% rounded text-m font-semibold cursor-pointer"
            >
              Select From Device
            </label>
            <input
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
              value={file.name}
              multiple={false}
              accept="image/jpeg, image/png, image/gif"
              type="file"
              name="post"
              id="post"
              className="hidden"
            ></input>
          </>
        ) : (
          <div className="flex flex-col p-5 gap-y-4">
            <input
              type="image"
              src={media.src}
              alt="Loading.."
              className="w-80 h-60"
              ref={currentImage}
            />

            <input
              type="text"
              name="caption"
              id="caption"
              value={media.caption}
              onChange={(event) =>
                setMedia((prev) => ({
                  ...prev,
                  caption: event.target.value,
                }))
              }
              placeholder="Add the caption..."
              className="w-auto border border-gray-300 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-center w-full gap-x-6">
              <button
                className="bg-[#0095F6] py-1 px-4 text-white active:scale-95 transform transition disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-xl font-semibold"
                onClick={removePost}
              >
                Remove
              </button>
              <button
                className="bg-[#0095F6] py-1 px-4 text-white active:scale-95 transform transition disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-xl font-semibold"
                onClick={uploadPost}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalFunctions;
