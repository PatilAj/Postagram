import { useContext, useState } from "react";
import { GlobalDispatchContext } from "../../State/Context/GlobalContext";
import { auth, db, storage } from "../../Firebase/Config";
import {
  serverTimestamp,
  setDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes as uploadStorageBytes,
} from "firebase/storage";

const IsOnboard = () => {
  const dispatch = useContext(GlobalDispatchContext);

  const [onboardingForm, setOnboardingForm] = useState({
    username: "",
    fullname: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const onboardingFormOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setOnboardingForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const profileImageOnChangeHandler = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const setUserData = async () => {
    try {
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);
      const users = querySnapshot.docs.map((doc) => doc.data());

      const existingUser = users.find(
        (user) => user.username === onboardingForm.username
      );

      if (existingUser) {
        toast.error("Username already exists");
        return;
      }

      const userData = {
        fullname: onboardingForm.fullname,
        username: onboardingForm.username,
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      };

      const userDocRef = doc(db, "users", auth.currentUser.email);

      if (profileImage) {
        const storageReference = storageRef(
          storage,
          `profileImages/${auth.currentUser.uid}-${profileImage.name}`
        );
        await uploadStorageBytes(storageReference, profileImage);
        const profileImageUrl = await getDownloadURL(storageReference);
        userData.profileImage = profileImageUrl;
      }

      await setDoc(userDocRef, userData);

      toast.success("Now you are Socially Open");

      dispatch({
        type: "SET_IS_ONBOARDED",
        payload: {
          isOnboarded: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onboardingSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOADING",
      payload: {
        isLoading: true,
      },
    });
    await setUserData();
    dispatch({
      type: "SET_LOADING",
      payload: {
        isLoading: false,
      },
    });
  };

  return (
    <form
      onSubmit={onboardingSubmitHandler}
      className="flex flex-col items-center space-y-5"
    >
      <div className="my-3">
        <h1 className="text-3xl text-center font-bold tracking-wider bg-gradient-to-r from-blue-700 via-red-600  to-fuchsia-600 text-transparent bg-clip-text">
          Postagram
        </h1>
      </div>
      <input
        type="text"
        name="username"
        id="username"
        onChange={onboardingFormOnChangeHandler}
        value={onboardingForm.username}
        className="w-full px-2 py-1 bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
        placeholder="Enter Username"
      />
      <input
        type="text"
        name="fullname"
        id="fullname"
        onChange={onboardingFormOnChangeHandler}
        value={onboardingForm.fullname}
        placeholder="Enter Full Name"
        className="w-full px-2 py-1 bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
      />
      <input
        type="file"
        name="profileImage"
        id="profileImage"
        onChange={profileImageOnChangeHandler}
      />
      <button
        type="submit"
        className="bg-[#0095F6] py-1 text-white active:scale-95 transform transition w-full disabled:bg-opacity-50 disabled:scale-100 rounded text-sm font-semibold"
        disabled={!onboardingForm.username || !onboardingForm.fullname}
      >
        Save
      </button>
    </form>
  );
};

export default IsOnboard;
