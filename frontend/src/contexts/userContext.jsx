import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  //const [user, setUser] = useState(null);
  const [cookies , setCookie , removeCookie] = useCookies(['user'])
  console.log(cookies)
  const [user , setCurrentUser] = useState(cookies.user ? cookies.user : {})

  const setUser = (newuser) => {
    if(newuser.token){
      setCookie('user' , JSON.stringify(newuser) , {path:'/' , maxAge : 60*60*24})
    }
    else{
      removeCookie('user')
    }
    setCurrentUser(newuser)
  }



  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
