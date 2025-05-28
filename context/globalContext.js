import React, {createContext,useState,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const GlobalContext = createContext();
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
export const GlobalContextProvider = ({children}) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth0User , setAuth0User] = useState(null);
    const [userProfile , setUserProfile] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
        try {
            const res = await axios.get('/api/v1/check-auth');
            console.log("OUR DATA ++ " ,res.data);
            setIsAuthenticated(res.data.isAuthenticated);
            setAuth0User(res.data.user);
            setLoading(false);
        } catch (error) {
            console.log("Error checking auth", error);
        }finally{
            setLoading(false);
        }
    };
    checkAuth();
    
    },[]);

    const getUserProfile = async (id) => {
        try {
            const res = await axios.get(`/api/v1/user/${id}`);
            setUserProfile(res.data);
            console.log("User Profile Fetched:", res.data);
        } catch (error) {
            console.log("Error fetching user profile", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated && auth0User && auth0User.sub) {
            console.log("Auth0 User Sub:", auth0User.sub);
            getUserProfile(auth0User.sub);
        }
    }, [isAuthenticated, auth0User]);
    
    return (
        
        <GlobalContext.Provider value={{
            isAuthenticated,
            auth0User,
            userProfile,
            getUserProfile,
            loading,
        }}>
        {children}
        </GlobalContext.Provider>
    );
};
export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};