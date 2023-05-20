import React from 'react';
import { collection, doc, addDoc, getDocs, deleteDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/Config';

const Follow = ({ user, currentUserId }) => {
  const handleFollow = async () => {
    try {
      const followDataRef = collection(db, 'followData');
      const followQuery = query(followDataRef, where('followedByUserId', '==', currentUserId), where('followedToUserId', '==', user.uid));
      const followQuerySnapshot = await getDocs(followQuery);
      const followDoc = followQuerySnapshot.docs[0];

      if (followDoc) {
        // Unfollow user
        await deleteDoc(doc(followDataRef, followDoc.id));
      } else {
        // Follow user
        const newFollowData = {
          followedByUserId: currentUserId,
          followedToUserId: user.uid,
          timestamp: serverTimestamp(),
        };
        await addDoc(followDataRef, newFollowData);
      }
    } catch (error) {
      console.error('Error updating follow data: ', error);
    }
  };

  return (
    <div>
      <button onClick={handleFollow}>{user.isFollowing ? 'Unfollow' : 'Follow'}</button>
    </div>
  );
};

export default Follow;
