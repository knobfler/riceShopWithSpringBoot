import axios from 'axios';

export const getCheckoutList = ({filter}) => axios.get(`/api/payment/?filter=${filter}`);
export const getCheckoutById = (id) => axios.get(`/api/payment/${id}`);
export const getUncheckedList = () => axios.get('/api/payment/unchecked');

export const search = ({filter, value}) => axios.get(`/api/payment/search?filter=${filter}&value=${value}`);