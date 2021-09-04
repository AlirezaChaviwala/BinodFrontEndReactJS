import { useState, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const UserDataContext = createContext();

const UserDataContextProvider = (props) => {
  let backEndURL = "http://localhost:8080";
  let history = useHistory();
  const [isSignedIn, setIsSignedIn] = useState(false);
  let signInCred = {};
  let persistLoginFlag=false;

  //const [userDetails,setUserDetails]= useState({isLoggedIn:isSignedIn,username:'',data:[],accessToken:''});
  const [accessToken, setAccessToken] = useState(null);
  const checkSignedIn = () => {
    isSignedIn ? history.push("/dashboard") : history.push("/signIU");
  };

  const [signInError, setSignInError] = useState({
    isError: false,
    status: null,
    message: "",
  });

  const [binodError, setBinodError] = useState({
    isError: false,
    status: null,
    message: "",
  });

  const [dashboardDetails, setDashboardDetails] = useState({});

  const getNewTokens = async () => {
    try {
      let getNewTokensResponse = await fetch(`${backEndURL}/getNewTokens`, {
        method: "post",
        credentials: 'include',
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Accept": "*",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
        }
      });
      return getNewTokensResponse;
      // console.log(getNewTokensResponse.status);
      // if (getNewTokensResponse.status !== 200) {
      //   setIsSignedIn(false);
      //   history.push("/signIU");
      //   console.log('done');
      //   persistLoginFlag=false;
      // } else {
      //   let getNewTokens = await getNewTokensResponse.json();
      //   setAccessToken(getNewTokens.accessToken);
      //   persistLoginFlag=true;
      // }
    } catch (error) {
      //history.replace('/signIU');
      console.log(error);
    }
  };

  const persistLogin=async()=>{
    console.log('context loaded');
      if(!isSignedIn||!accessToken){
        console.log('done');
        const response=await getNewTokens();
        console.log('done after');
        if (response.status !== 200) {
            setIsSignedIn(false);
            //history.push("/signIU");                      
            console.log('done');
            //persistLoginFlag=false;
          } else {
            let getNewTokens = await response.json();
            setAccessToken(getNewTokens.accessToken);
            history.push('/dashboard');
            //persistLoginFlag=true;
          }

        // if(persistLoginFlag){
        //   setIsSignedIn(true);
        //   history.push('/dashboard');
        // }
      }
  };
  //persistLogin();

  let value = {
    backEndURL,
    checkSignedIn,
    signInError,
    isSignedIn,
    signInCred,
    dashboardDetails,
    setDashboardDetails,
    accessToken,
    setAccessToken,
    setIsSignedIn,
    getNewTokens,
    setSignInError,
    binodError,
    setBinodError,
    persistLogin
  };
  return (          
    <UserDataContext.Provider value={value}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
