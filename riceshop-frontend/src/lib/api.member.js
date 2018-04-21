import axios from 'axios';

export const register = ({userID, userPassword, userEmail, userName}) => axios.post('/api/member/', {userID, userPassword, userEmail, userName});
export const login = ({userID, userPassword}) => axios.post('/api/member/login', {userID, userPassword});
export const check = () => axios.post('/api/member/check');
export const logout = () => axios.post('/api/member/logout');