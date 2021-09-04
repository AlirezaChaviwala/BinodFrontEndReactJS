import React from "react";
import "../createNewPassword/createNewPassword.css";

const CreateNewPassword = () => {
  return (
    <div className="create-new-password-wrapper">
      <div className="cnp-container">
        <h2>Create New Password</h2>
        <form>
          <label>New password</label>
          <input type="password" required />
          <label>Confirm New password</label>
          <input type="password" required />
          <small>(minimum 8 characters)</small>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
