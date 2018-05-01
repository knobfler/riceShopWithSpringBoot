import axios from 'axios';

export const adminLogin = ({adminID, password}) => axios.post(`/api/admin/`, {adminID, password});
export const adminCheck = () => axios.post('/api/admin/check');
export const adminLogout = () => axios.post('/api/admin/logout');

