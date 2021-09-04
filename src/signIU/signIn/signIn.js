import React, { useRef, useContext, useEffect } from "react";
import "../signIn/signIn.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { UserDataContext } from "../../userDataContext";
import axios from "axios";

const SignIn = ({ toggleHasAccount }) => {
  let history = useHistory();
  let emailInput = useRef(null);
  let passwordInput = useRef(null);
  var {
    backEndURL,
    accessToken,
    signInError,
    signInCred,
    isSignedIn,
    setAccessToken,
    setIsSignedIn,
    setSignInError,
    persistLogin
  } = useContext(UserDataContext);

  //persistLogin();

  const handleSignIn = async (e) => {
    e.preventDefault();
    signInCred = {
      userEmail: emailInput.current.value,
      password: passwordInput.current.value,
    };
    try {
      let signInResponse = await axios.post(
        `${backEndURL}/signIn`,
        { email: signInCred.userEmail, password: signInCred.password },
        { headers: { "Content-Type": "application/json" } }
      );
      setSignInError({
        isError: false,
        status: null,
        message: "",
      });
      setAccessToken(signInResponse.data.accessToken);
      setIsSignedIn(true);
      history.replace('/dashboard');
    } catch (error) {
      console.log(error);
      setSignInError({
        isError: true,
        status: error.response.data.error.status,
        message: error.response.data.error.message,
      });
    }
  }

  return (
    <>
    <div className="signin-wrapper">
      <h2>Sign In</h2>
      <hr />
      {signInError.isError ? (
        <div className="error-div">
          <span>{signInError.message}</span>
        </div>
      ) : null}
      <form className="sign-in-form">
        <label htmlFor="signin-email-input">Email ID</label>
        <input
          ref={emailInput}
          name="signin-email-input"
          type="text"
          required
        />

        <label htmlFor="signin-password-input">Password</label>
        <input
          ref={passwordInput}
          name="signin-email-input"
          type="password"
          required
        />
        <Link to="/forgotMyPassword">Forgot my password</Link>

        <button onClick={handleSignIn}>Sign In</button>
      </form>
      <p>
        Don't have an account?
        <br />
        Click <a onClick={toggleHasAccount}>here</a>
      </p>
    </div>
    </>
  );
};

export default SignIn;
