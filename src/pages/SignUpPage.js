import React, { useState } from "react";
import Header from "../components/common/Header";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";
const SignUpPage = () => {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <Header />
     <div className="hero-section">
   <div className="h-content">
   <h1 className="podcastApp-name">EARWAVES</h1>
     <h2>Explore the Power of Podcasting</h2>
     <p>Unveil the Unheard, Uncover the Unexplored, and Unlock the Power of Voice in Every Episode.</p>
   </div>
      
     </div>
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? (
          <>
            <SignupForm />
            <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
              Already have an Account? Click here to login.
            </p>
          </>
        ) : (
          <>
            <LoginForm />
            <p style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
              Don't have an account? Click here to Signup.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
