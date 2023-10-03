import { useEffect } from "react";
import LoginComponent from "../components/LoginComponent";

const LoginPage = () => {
    useEffect(()=>{
        document.title = "Login"
    },[])
    return(
        <div className="pageContainer">
            <h1 className="pageTitle">Login</h1>
            <LoginComponent/>
        </div>
    )
}

export default LoginPage;