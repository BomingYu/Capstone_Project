import { useUserContext } from "../contexts/userContext";

function HomePage(){
    const {user} = useUserContext();
    return(
        <div className="pageContainer">
            {user?  <h1 className="pageTitle">Welcome {user.userName}!</h1> :  <h1 className="pageTitle">Welcome!</h1>}
           
        </div>
    )
}

export default HomePage;