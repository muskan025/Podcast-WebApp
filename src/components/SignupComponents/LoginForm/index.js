import React, { useState } from "react";
import InputComponent from "../../common/input";
import Button from "../../common/Button";
import { auth, db, provider, storage } from "../../../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate } from "react-router-dom";
 import {setUser} from '../../../slices/userSlice'
import { toast } from "react-toastify";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const dispatch=useDispatch()
const navigate=useNavigate( )
 async function handleLogin() {
     setLoading(true)
    if(email && password){ try {
      //Creating user's account
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      //Saving user Details
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
 
      //Save data in the redux
      dispatch(
        setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
        })
      );
      toast.success("Login Successful");
      setLoading(false);
      navigate("/profile");
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  
 }
   else{
toast.error("All fields are mandatory")
      setLoading(false);

   }  
}

// signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;
//   })
//   .catch((e) => {
//     toast.error(e.message);
//   });
  // const handleGoogleSingIn = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user);
  //       setUser(user);
  //       toast.success("login successfull");
  //     })
  //     .catch((e) => {
  //       toast.error(e.message);
  //     });
  // };
  return (
    <>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Eamil Name"
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

      <Button text={loading?"Loading...":"Login"} disabled={loading} onClick={handleLogin} />
      {/* <Button text={loading?"Loading...":"Login using Google"} disabled={loading} onClick={handleGoogleSingIn} /> */}
    </>
  );
};

export default LoginForm;
