import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/common/Header";
import Button from "../components/common/Button";

import { auth, db, storage } from "../firebase";
import { getAuth, signOut, updateEmail, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { setUser } from "../slices/userSlice";
import InputComponent from "../components/common/input";
import FileInput from "../components/common/input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Profile = () => {

  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalProfileImage, setOriginalProfileImage] = useState(null);
  useEffect(() => {
    //check if user exist
    if (!user) {
      <Loader />
       
      setTimeout(()=>{
        setLoading(false)
      },4000)
    }
    else {
      async function getUserData() {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserData(userDoc.data());
      }

      getUserData();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      setFullName(userData.name);
      setEmail(userData.email);
      setProfileImage(userData?.photoURL);
      setOriginalProfileImage(userData?.photoURL);
      setDob(userData.dob)
      setGender(userData.gender)
      setLocation(userData.location)
      setPincode(userData.pincode)
    }
  }, [userData]);


  async function updateUserProfile() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }

    // Check if the profile image has changed
    if (profileImage !== originalProfileImage) {
      // Upload the image to Firebase storage
      const profileImageRef = ref(
        storage,
        `users/${auth.currentUser.uid}/${Date.now()}`
      );
      await uploadBytes(profileImageRef, profileImage);

      // Get a download URL for the uploaded image
      const profileImageUrl = await getDownloadURL(profileImageRef);

      // Update the user's profile in Firebase Auth
      await updateProfile(currentUser, {
        displayName: fullName,
        photoURL: profileImageUrl,
        
      })
        .then(() => {
          const db = getFirestore();

          // Get a reference to the user's document in Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          // Update the user's name and photoURL in Firestore
          updateDoc(userDocRef, {
            name: fullName,
            photoURL: profileImageUrl,
            dob:dob,
        gender:gender,
        location:location,
        pincode:pincode
          });
          
          setProfileImage(userData.photoURL);
          dispatch(
            setUser({
              name: fullName,
              email: email,
              uid: user.uid,
            })
          );
          
          // Update the state with the download URL for the uploaded image

          toast.success("Profile updated!");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } else {
      // Only update the user's name in Firebase Auth and Firestore
      await updateProfile(currentUser, {
        displayName: fullName,
      })
        .then(() => {
          const db = getFirestore();
          const userDocRef = doc(db, "users", currentUser.uid);
          updateDoc(userDocRef, {
            name: fullName,
            dob:dob,
        gender:gender,
        location:location,
        pincode:pincode,
          });
 
          dispatch(
            setUser({
              name: fullName,
              email: email,
              dob:dob,
              gender:gender,
              location:location,
              pincode:pincode,
              uid: user.uid,
            })
          );

          toast.success("Profile updated!");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  }

  function handleGender(e){
    setGender(e.target.value);
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  function handleProfileImage(file) {
    if (file) {
      setProfileImage(file);
    }
  }
  return (
    <div>
      {!user ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="profile-div">
            <div className="left-div">
              {profileImage ? (
                <img
                  src={userData.photoURL}
                  
                  className="profile-img"
                />
              ) : userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt="Profile"
                  className="profile-img"
                />
              ) : (
                <div className="profile-placeholder"> </div>
              )}
              
            </div>
            <div className="right-div">
            <div className="info">

            <label htmlFor="full-name-input">Full Name</label>
                <InputComponent
                  id="full-name-input"
                  type="text"
                  state={fullName}
                  setState={setFullName}
                  placeholder=""
                  required={true}
                  style={{ fontSize: "24px"}}
                />
              </div>
              <div className="info">
                <label htmlFor="email-input">Email</label>
                <InputComponent
                  id="email-input"
                  type="email"
                  state={email}
                  setState={setEmail}
                  placeholder=""
                  required={true}
                />
              </div>
              <div className="info">
                <label htmlFor="dob-input">DOB</label>
                <InputComponent
                  id="dob-input"
                  type="date"
                  state={dob}
                  setState={setDob}
                  placeholder=""
                  required={true}
                />
              </div>
              <div className="info">
                <label htmlFor="gender-input">Gender</label>
                <select 
                id="gender-input"
                value={gender}
                className="custom-input"
                onChange={handleGender}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="info">
                <label htmlFor="location-input">Location</label>
                <InputComponent
                  id="location-input"
                  type="text"
                  state={location}
                  setState={setLocation}
                  placeholder=""
                  required={true}
                />
              </div>
              <div className="info">
                <label htmlFor="pin-code-input">Pin Code</label>
                <InputComponent
                  id="pin-code-input"
                  type="text"
                  state={pincode}
                  setState={setPincode}
                  placeholder=""
                  required={true}
                />
              </div>
              
            
            <div className="info">
              <label htmlFor="profile-img-input">Update Image</label>
              <FileInput
                accept="image/*"
                id="profile-img-input"
                fileHandleFnc={handleProfileImage}
                text="Change Profile Image"
              />
            </div>
            <div className="info">
              <Button
                text={"Update Profile"}
                onClick={updateUserProfile}
                logOutStyle={{width:"10rem", marginTop:"2.3rem" }}
              />
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
