import React, { useEffect, useState } from "react";
import InputComponent from "../../common/input";
import Button from "../../common/Button";
import { auth, db, storage, provider } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";
import FileInput from "../../common/input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignUP() {
    setLoading(true);

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      setLoading(false);
      return;
    }
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter"
      );
      setLoading(false);
      return;
    }
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        const profileImageRef = ref(
          storage,
          `users/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(profileImageRef, profileImage);

        const profileImageUrl = await getDownloadURL(profileImageRef);

        //Creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: fullName,
          photoURL: profileImageUrl,
        });

        const user = userCredential.user;
        //Saving user Details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          photoURL: profileImageUrl,
        });
        //Save data in the redux
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            photoURL: profileImageUrl,
          })
        );
        toast.success("Account created successfully");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (
        fullName === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        toast.error("All fields are mandatory");
      } else if (password.length < 6) {
        toast.error("Password should contain at least 6 characters");
      } else if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match");
      }
      setLoading(false);
    }
  }

  function profileImageHandle(file) {
    setProfileImage(file);
  }

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required
      />
      <FileInput
        accept={"image/*"}
        id="profile-image-input"
        fileHandleFnc={profileImageHandle}
        text={"Profile Image Upload"}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email Name"
        type="email"
        required
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignUP}
      />
    </>
  );
};

export default SignupForm;
