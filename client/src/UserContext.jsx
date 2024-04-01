import { createContext, useState, useEffect, useContext } from "react";


export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [User, setUser] = useState({});

    const storeUserInLS = (User)=>{
        return localStorage.setItem("User", JSON.stringify(User))
    }

    useEffect(() => {
        // Retrieve user data from localStorage when component mounts
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    console.log("Context User", User);

    return (
        <UserContext.Provider value={{ User, storeUserInLS }}>
            {children}
        </UserContext.Provider>
    );
}

export const useCon = ()=>{
    const userContextValue = useContext(UserContext);
    if (!userContextValue) {
        throw new Error("useCon used outside of the Provider");
    }
    return userContextValue;    
}