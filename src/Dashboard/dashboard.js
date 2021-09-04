import React, { useEffect, useContext, useRef ,useState} from "react";
import { useHistory } from "react-router-dom";
import "../Dashboard/dashboard.css";
import LinkRecord from "./linkRecord";
import { UserDataContext } from "../userDataContext";
import axios from "axios";

const Dashboard = () => {
  let history = useHistory();
  let binodItForm = useRef(null);
  const [previousRecordsArray, setPreviousRecordsArray] = useState([]);
  //const previousRecordsArray = [];

  const {
    backEndURL,
    isSignedIn,
    dashboardDetails,
    setDashboardDetails,
    accessToken,
    setIsSignedIn,
    setAccessToken,
    getNewTokens,
    binodError,
    setBinodError,
    persistLogin
  } = useContext(UserDataContext);

  const getRecords = async () => {
    try {
      let getRecordsResponse = await fetch(`${backEndURL}/getRecords`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "*",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
          Authorization: `bearer ${accessToken}`,
        },
      });
      if (getRecordsResponse.status === 401) {
        await getNewTokens();
        await getRecords();
      } else {
        let getRecordsData = await getRecordsResponse.json();
        console.log(getRecordsData);
        setDashboardDetails({
          userName: dashboardDetails.userName,
          data: [...getRecordsData],
        });
        // setPreviousRecordsArray([]);
        // setPreviousRecordsArray([dashboardDetails.data[dashboardDetails.data.length-1],...previousRecordsArray]);
        // previousRecordsArray=[];
        // for (let i = 0; i < getRecordsData.data.length; i++) {
        //   previousRecordsArray.push(
        //     getRecordsData.data[getRecordsData.data.length - 1 - i]
        //   );
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const binodIt = async (e) => {
    e.preventDefault();
    try {
      let binodItResponse = await fetch(`${backEndURL}/binodit`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "*",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify({ longUrl: binodItForm.current.value }),
      });
      let binodItResult = await binodItResponse.json();
      if (binodItResponse.status !== 200) {
        setBinodError({
          isError: true,
          status: binodItResult.error.status,
          message: binodItResult.error.message,
        });
      } else {
        await getRecords();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadDashboard = async () => {
    console.log(accessToken);
    try {
      let dashboardResponse = await fetch(`${backEndURL}/dashboard`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "*",
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST",
          Authorization: `bearer ${accessToken}`,
        },
      });
      if (dashboardResponse.status === 401) {
        //throw new Error("401");
        await getNewTokens();
        await loadDashboard();
      } else {
        let dashboardResult = await dashboardResponse.json();
        setDashboardDetails(dashboardResult);
        // setPreviousRecordsArray([]);
        // setPreviousRecordsArray([dashboardResult.data[dashboardResult.data.length-1],...previousRecordsArray]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(history);
  console.log(isSignedIn);
  console.log(previousRecordsArray);
  // if (dashboardDetails.hasOwnProperty("userName")) {
  //   // for (let i = 0; i < dashboardDetails.data.length; i++) {
  //   //   previousRecordsArray.push(
  //   //     dashboardDetails.data[dashboardDetails.data.length - 1 - i]
  //   //   );
  //   // }
  //   setPreviousRecordsArray([dashboardDetails.data[dashboardDetails.data.length-1],...previousRecordsArray]);
  // }

  useEffect(async () => {
    await loadDashboard();
    //history.replace('/dashboard');
  }, []);

  useEffect( () => {
    if(dashboardDetails.length>0){
      setPreviousRecordsArray([dashboardDetails.data[dashboardDetails.data.length-1],...previousRecordsArray]);
    }
    return ()=>{
      console.log('done');
      setPreviousRecordsArray([]);
    }
  }, [dashboardDetails]);

  return (
    <div className="dashboard-wrapper">
      {!dashboardDetails.userName && <div>Loading...</div>}
      {dashboardDetails.userName && (
        <>
          <h2>Hello, {dashboardDetails.userName}</h2>
          <form>
            {binodError.isError ? (
              <div className="error-div">
                <span>{binodError.message}</span>
              </div>
            ) : null}
            <input
              ref={binodItForm}
              type="text"
              required
              placeholder="For eg:youtube.com/feed/explore"
            />
            <button onClick={(e) => binodIt(e)}>bin.od it!</button>
          </form>
          {previousRecordsArray.length > 0 ? <h3>Previous Links</h3> : null}
          {previousRecordsArray.length > 0
            ? previousRecordsArray.map((record, index) => {
                return <LinkRecord record={record} key={index} />;
              })
            : null}
        </>
      )}
    </div>
  );
};

export default Dashboard;
