import axios from './axiosConfig';


export const sendLogInOtp = ({ username }) => {
    return axios.post('/accounts/send-login-otp', { username });
}

export const validateLoginOtp = ({ username, otp }) => {
    return axios.post('/accounts/validate-login-otp', { username, otp });
}

export const logOut = () => {
    return axios.get('/accounts/logout');
}

export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
}

export const getPatientLidting = () => {
    return axios.get('/doctor/patients');
}
