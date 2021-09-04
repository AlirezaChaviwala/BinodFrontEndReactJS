import React from "react";
import "../forgotMyPassword/forgotMyPassword.css";

const ForgotMyPassword = () => {
  return (
    <div className="forgot-my-password-wrapper">
      <div className="fmp-container">
        <h2>Forgot Your Password?</h2>
        <form>
          <h3>Enter the Email Id registered with your account</h3>
          <input type="text" required placeholder="Eg: binod@example.com" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotMyPassword;
