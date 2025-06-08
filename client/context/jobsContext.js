import React , { createContext,useContext,useState,useEffect} from 'react';
import { useGlobalContext } from './globalContext';
import toast from 'react-hot-toast';
import axios from 'axios';
const JobsContext = createContext();

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
export const JobsContextProvider = ({children}) => {
    const {userProfile} = useGlobalContext();
    const [jobs,setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userJobs, setUserJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        tags:"",
        location:"",
        title:"",
    });

    //filters
    const [filters,setFilters] = useState({
        fullTime: false,
        partTime: false,
        internship:false,
        contract:false,
        fullStack: false,
        backend: false,
        devOps: false,
        uiux: false,
        minSalary: 0,
        maxSalary: 5000000,
    });

    const [minSalary,setMinSalary] = useState(30000);
    const [maxSalary, setMaxSalary] = useState(5000000);

    const getJobs = async() => {
        setLoading(true);
        try {
            const res = await axios.get('/api/v1/jobs');
            setJobs(res.data);
        } catch (error) {
            console.log("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (jobData) => {
       
        try {
            const res = await axios.post('/api/v1/jobs', jobData);
            toast.success("Job created successfully");
            setJobs(prevJobs => [res.data , ...prevJobs ]);
            //update user jobs
            if(userProfile._id) {
                setUserJobs(prevJobs => [res.data, ...prevJobs]);
            }
        } catch (error) {
            console.log("Error creating job:", error);
        } 
    };

    const getUserJobs = async (userId) => {
        try {
            setLoading(true);
            const res = await axios.get("/api/v1/jobs/user/"+ userId);
            setUserJobs(res.data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching user jobs:", error);
        } finally {
            setLoading(false);
        }
    };
   
    const searchJobs = async (tags,location,title) => {
        setLoading(true);
        try {
            //build the query string based on the provided parameters
          const query = new URLSearchParams();//search?title=?location=?
          if(tags) query.append('tags', tags);
          if(location) query.append('location', location);
          if(title) query.append('title', title);
          //send the request
          const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`);
          // set jobs to the response data
          setJobs(res.data);
          setLoading(false);
        } catch (error) {
            console.log("Error searching jobs:", error);
        } finally {
            setLoading(false);
        }
    };
    
    //get job by id
    const getJobById = async (id) => { 
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/jobs/${id}`);
            return res.data;
        } catch (error) {
            console.log("Error fetching job by ID:", error);
        } finally {
            setLoading(false);
        }
    };

    // like a job
    const likeJob = async (jobId) => {
        try {
            const res = await axios.put(`/api/v1/jobs/like/${jobId}`);
            toast.success("Job liked");
            getJobs();
        } catch (error) {
            console.log("Error liking job:", error);
        } 
    };

    // apply to a job
    const applyToJob = async (jobId) => {
        try {
            const res = await axios.put(`/api/v1/jobs/apply/${jobId}`);
            toast.success("Job application sent");
            getJobs();
        } catch (error) {
            console.log("Error applying to job:", error);
            toast.error(error.response.data.message);
        } 
    };

    // delete a job
    const deleteJob = async (jobId) =>
    {
        try {
            const res = await axios.delete(`/api/v1/jobs/${jobId}`);
            setJobs(prevJobs => prevJobs.filter((job) => job._id !== jobId));
            setUserJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
            toast.success("Job deleted successfully");
        } catch (error) {
            console.log("Error deleting job:", error);
        } 
    };

    //
    const handleSearchChange = (searchName, value) => {
    setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
  };

    const handleFilterChange = (filterName, value) =>{
        setFilters((prev)=> ({...prev,[filterName]: !prev[filterName]}));
    };

    useEffect(() => {
        getJobs();
    }, []); 
    
    useEffect(() => {
        if (userProfile._id) {
            getUserJobs(userProfile._id);
        }
    }, [userProfile]);
    
    return (
        <JobsContext.Provider value={{
            jobs,
            loading,
            userJobs,
            createJob,
            searchJobs,
            getJobById,
            likeJob,
            applyToJob,
            deleteJob,
            handleSearchChange,
            searchQuery,
            setSearchQuery,
            handleFilterChange,
            filters,
            minSalary,
            setMinSalary,
            maxSalary,
            setMaxSalary,
            setFilters,
        }}>
            {children}
        </JobsContext.Provider>
    );
};

export const useJobContext = () => {
    return useContext(JobsContext);
};
