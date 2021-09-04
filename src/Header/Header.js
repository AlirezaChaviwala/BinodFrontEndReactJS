import React,{useContext} from "react";
import "./Header.css";
import HeaderButton from "./headerButton";
import HeaderNav from "./headerNav";
import {useLocation, useHistory} from 'react-router-dom';
import { UserDataContext } from "../userDataContext";

const Header = () => {
  let location=useLocation();
  let history = useHistory();
  let {checkSignedIn,persistLogin}=useContext(UserDataContext);

  return (
    <div className="header-wrapper">
      <span className="header">bin.od</span>
      {
        location.pathname=='/'?
          <><HeaderButton innerText={'Sign In'} handleClick={()=>history.push('/signIU')} className={'header-button'}/>
        <HeaderNav/></>:(location.pathname=='/dashboard'?<HeaderButton innerText={'Log Out'} className={'header-button log-out'}/>:null)
      }
    </div>
  );
};

export default Header;
