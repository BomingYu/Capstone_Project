import { useEffect } from "react";
import SignupComponent from "../components/SignupComponent";

const SignupPage = () => {
    useEffect(()=>{
        document.title = "Signup"
    },[])
    return(
        <div className="pageContainer">
            <h1 className="pageTitle">Signup</h1>
            <SignupComponent/>
        </div>
    )
}

export default SignupPage;