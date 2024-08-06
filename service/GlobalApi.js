import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    },
});
const CreateNewResume = async (data) => {
    try {
        console.log('Sending data:', data); 
        const response = await axiosClient.post('/user-resumes', data); 
        console.log('Response data:', response.data); 
        return response.data; 
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); 
        throw error; 
    }
};

const GetUserResumes = (userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail = (id,data) => axiosClient.put('/user-resumes/'+id,data)
export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail
};