import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SettingPasswordPage from "../pages/SettingPassworPage";
import ProtectedRoute from "./ProtectedRoutes";

function AppRoutes(props){
    return(
        <Routes>
            <Route path="/" element={<HomePage {...props}/>}/>
            <Route path="/login" element={<LoginPage {...props}/>}/>
            <Route path="/signup" element={<SignupPage {...props}/>}/>
            <Route path="/settingPassword" element={<ProtectedRoute><SettingPasswordPage {...props}/></ProtectedRoute>}/>
        </Routes>
    )
}

export default AppRoutes;