import React, { useState } from "react";
import Header from "../components/common/Header";
  import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";
const SignUpPage = () => {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <Header />
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
        }

export default SignUpPage;
