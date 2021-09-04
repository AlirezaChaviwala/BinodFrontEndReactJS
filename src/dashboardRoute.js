import { useContext } from "react";
import { UserDataContext } from "./userDataContext";
import {  BrowserRouter, Switch,Route,Redirect} from "react-router-dom";
import Dashboard from "./Dashboard/dashboard";

const DashboardRoute=({component:Component})=>{
    const {isSignedIn} = useContext(UserDataContext);

    return(
        <Route render={()=>{
            return isSignedIn?<Component/>:<Redirect to="/signIU"/>
        }}/>
    );
}

export default DashboardRoute;