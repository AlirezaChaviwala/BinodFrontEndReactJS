import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const HeaderNav = () => {
  const [rightStyleObject, setRightStyleObject] = useState({});
  const changeRight = () => {
    Object.entries(rightStyleObject).length === 0
      ? setRightStyleObject({ right: "0" })
      : rightStyleObject["right"] === "-80vw"
      ? setRightStyleObject({ right: "0" })
      : setRightStyleObject({ right: "-80vw" });
  };
  return (
    <div className="header-nav">
      <ul style={rightStyleObject}>
        <li>
          <Link to="" className="anc">
            Sign In
          </Link>
        </li>
        <hr />
        <li>
          <Link to="" className="anc">
            Sign Up
          </Link>
        </li>
      </ul>
      <a
        onClick={(e) => {
          e.preventDefault();
          changeRight();
        }}
        href=""
        id="hamburger-icon"
      >
        <i className="fas fa-bars"></i>
      </a>
    </div>
  );
};

export default HeaderNav;
