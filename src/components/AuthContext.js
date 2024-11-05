// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const login = () => {
        setIsAdmin(true);
    };

    const logout = () => {
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
