import { useEffect } from "react";
import SettingPasswordComponent from "../components/SettingPasswordComponent"

const SettingPasswordPage = () => {
    useEffect(()=>{
        document.title = "Password Setting"
    },[])
    return(
        <div className="pageContainer">
            <h1 className="pageTitle">Change Password</h1>
            <SettingPasswordComponent />
        </div>
    )
}

export default SettingPasswordPage;