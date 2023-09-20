import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";

function AppRoutes(props){
    return(
        <Routes>
            <Route path="/" element={<HomePage {...props}/>}/>
            <Route path="/login" element={<LoginPage {...props}/>}/>
            <Route path="/signup" element={<SignupPage {...props}/>}/>
        </Routes>
    )
}

export default AppRoutes;