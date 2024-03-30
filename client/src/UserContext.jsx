import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const User = localStorage.getItem('User');
    return (
        <UserContext.Provider value={User}>
            {children}
        </UserContext.Provider>
    );
}

