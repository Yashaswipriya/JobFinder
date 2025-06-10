import React, {createContext,useState,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const GlobalContext = createContext();
axios.defaults.baseURL = 'https://jobfinder-31ca.onrender.com';
axios.defaults.withCredentials = true;
export const GlobalContextProvider = ({children}) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth0User , setAuth0User] = useState(null);
    const [userProfile , setUserProfile] = useState({});
    const [loading, setLoading] = useState(false);

    //input state
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [salary, setSalary] = useState('0');
    const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
    const [salaryType, setSalaryType] = useState('Yearly');
    const [negotiable, setNegotiable] = useState(false);
    const [tags, setTags] = useState([]);
    const [skills, setSkills] = useState([]);
    const [location, setLocation] = useState({
        country: '',
        city: '',
        address:'',
    });
    
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
        try {
            const res = await axios.get('/api/v1/check-auth',{withCredentials: true});
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
            const res = await axios.get(`/api/v1/user/${id}`,{withCredentials: true});
            setUserProfile(res.data);
            console.log("User Profile Fetched:", res.data);
        } catch (error) {
            console.log("Error fetching user profile", error);
        }
    };

    // handle input changes
    const handleTitleChange = (e) => {
        setJobTitle(e.target.value.trimStart());
    };
    const handleDescriptionChange = (e) => {
        setJobDescription(e.target.value.trimStart());
    };
    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
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
            jobTitle,
            jobDescription,
            salary,
            activeEmploymentTypes,
            salaryType,
            negotiable,
            tags,
            skills,
            location,
            handleTitleChange,
            handleDescriptionChange,
            handleSalaryChange,
            setActiveEmploymentTypes,
            setJobDescription,
            setSalaryType,
            setNegotiable,
            setTags,
            setSkills,
            setLocation,
        }}>
        {children}
        </GlobalContext.Provider>
    );
};
export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};