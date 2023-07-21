import React, { useState } from "react";
import InputComponent from "../../common/input";
import Button from "../../common/Button";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignUP() {
    console.log("Handling sugnup");
    setLoading(true);
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        //Creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        //Saving user Details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });
        //Save data in the redux
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User has been created");
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
        toast.error("Password should contain atleast 6 characters");
      } else if (password !== confirmPassword) {
         toast.error("Password and confirm password does not match");
      }
      setLoading(false);
    }
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
