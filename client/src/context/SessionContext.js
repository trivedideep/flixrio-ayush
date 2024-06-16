// src/context/SessionContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
export const SessionContext = createContext();

// Create a provider component
export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchSession = async () => {
        try {
            const response = await axios.get('http://localhost:8080/session', {
                withCredentials: true // Ensure cookies are sent
            });
            if (response.status === 200) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching session:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ user, fetchSession }}>
            {children}
        </SessionContext.Provider>
    );
};
