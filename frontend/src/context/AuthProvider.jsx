import { AuthContext } from "./AuthContext";
import { useState } from "react";


export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            try {
                return JSON.parse(storedUser)
            } catch {
                localStorage.removeItem('user');
                return null;
            }
        }
        const token = localStorage.getItem('token');
        return token ? {token} : null;
    });

    const login = (data) => {
        const { token, ...user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser({...user,token});
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    const isAuthenticated = !!user;
    return <AuthContext.Provider value={{user,login,logout,isAuthenticated}}>
        {children}
    </AuthContext.Provider>
    
};

