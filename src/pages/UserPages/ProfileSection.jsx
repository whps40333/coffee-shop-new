import React from "react";
import { useEffect, useState } from "react";
import classes from "../../styles/pages/UserPages/profileSection.module.css";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function ProfileSection() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [avatarRef, setAvatarRef] = useState(null);
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserName(user.displayName);
        setPhotoURL(user.photoURL);
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        console.log("avatarRef:", avatarRef);
        setAvatarRef(avatarRef); // 在这里设置StorageReference对象
      }
    });
    return unsubscribe;
  }, [auth, storage]);

  // const submitHandler = () => {};
  const submitHandler = async (event) => {
    event.preventDefault();

    if (userName !== user.displayName) {
      await updateProfile(user, { displayName: userName });
    }

    if (newPhoto && avatarRef) {
      // 添加一个条件来确保avatarRef已被设置
      // Create a reference to the file we want to upload
      const fileRef = ref(avatarRef, newPhoto.name);

      // Upload file to Firebase Storage
      const uploadTask = uploadBytesResumable(fileRef, newPhoto);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
        },
        async () => {
          // Handle successful uploads
          console.log("Upload successful");

          // Get the download URL for the file
          const downloadURL = await getDownloadURL(fileRef);
          setPhotoURL(downloadURL);
          await updateProfile(user, { photoURL: downloadURL });
        }
      );
    }
  };

  const photoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPhoto(file);
    }
  };

  const nameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      <div className={classes.photo}>
        <img src={photoURL} alt="User avatar" />
        <label htmlFor="photo"></label>
        <input type="file" id="Photo" onChange={photoChange} />
      </div>
      <div className={classes.name}>
        <label htmlFor="Name"></label>
        <input
          type="text"
          id="Name"
          placeholder="更改名稱"
          onChange={nameChange}
        />
      </div>
      <button className={classes.submit}>儲存</button>
    </form>
  );
}

export default ProfileSection;
