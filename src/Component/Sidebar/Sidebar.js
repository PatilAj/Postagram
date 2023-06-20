import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Firebase/Config";

const Sidebar = ({ username }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection);
    onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      const filteredUsers = users.filter((user) => user.username !== username);
      setSuggestedUsers(filteredUsers);
    });
  }, [username]);

  return (
      <div className="w-1/5 p-4 fixed h-screen bg-gradient-to-b from-blue-900 to-pink-500 rounded-tl-3xl rounded-tr-3xl">
        <div className="py-3  w-auto">
          <div className="flex items-center justify-center py-2 font-semibold text-xl">
            Suggestions for you
          </div>
          <div className="py-4 space-y-3">
            {suggestedUsers.map((user) => (
              <div
                className="flex items-center justify-between cursor-pointer"
                key={user.username}
              >
                <div className="text-white">{user.fullname}</div>
                <button className={'px-2 bg-blue-600 text-white rounded-md hover:text-white-500 transition-colors duration-300'}>
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
