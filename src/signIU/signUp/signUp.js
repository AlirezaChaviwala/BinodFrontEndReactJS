import React from "react";
import '../signUp/signUp.css';

const SignUp = ({ toggleHasAccount }) => {
  return (
    <div className="signup-wrapper">
      <h2>Sign Up</h2>
      <hr/>
      <form className="sign-up-form">
        <label htmlFor="signup-name-input">Name</label>
        <input name="signup-name-input" type="text" required />
        <label htmlFor="signup-email-input">Email ID</label>
        <input name="signup-email-input" type="text" required />
        <label htmlFor="signup-password-input">Password</label>
        <input name="signup-email-input" type="password" required />
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account?
        <br />
        Click <a onClick={toggleHasAccount}>here</a>
      </p>
    </div>
  );
};

export default SignUp;
