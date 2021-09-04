import React,{useState,useContext} from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import { UserDataContext } from "../userDataContext";
import SignIn from './signIn/signIn';
import SignUp from './signUp/signUp';
import '../signIU/signIU.css';


const SignIU = () => {
    let history = useHistory();
    const [hasAccount,setHasAccount]= useState(true);
    var {
        isSignedIn,
        persistLogin
      } = useContext(UserDataContext);

    const toggleHasAccount=()=>{
        console.log(hasAccount);
        setHasAccount(!hasAccount);
    };

    console.log(history);
  console.log(isSignedIn);
  console.log('done');
  persistLogin();

    return (
        <>
        {
            isSignedIn?<Redirect to='/dashboard'/>:<div className='sign-iu'>
            <div className='sign-iu-content'></div>
            {hasAccount&&<SignIn toggleHasAccount={toggleHasAccount}/>}
            {!hasAccount&&<SignUp toggleHasAccount={toggleHasAccount}/>}
        </div>
         }
        </>
    )
}

export default SignIU;
