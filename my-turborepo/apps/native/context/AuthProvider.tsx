import React, { createContext, useState, useContext } from 'react';

// Define the shape of the context
interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    user: any;
}

// Create the context
export const AuthContext = createContext<AuthContextProps | undefined>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    user: {
        id: "2",
        Name: "",
        Image: "",
        challenge: {
            Goal: "",
        },
    }

});

interface AuthProviderProps {
    children: React.ReactNode;
  }
// Create the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({
        id: 1,
        Name: "",
        Image: "",
        challenge: {
            Goal: "",
        },
    });

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};