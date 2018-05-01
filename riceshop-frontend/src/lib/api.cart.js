import axios from 'axios';

export const addCart = ({id, title, amount, thumbnailImage, totalPrice, option}) => axios.post('/api/cart/', {id, title, amount, thumbnailImage, totalPrice, option});
export const getCartList = (config) => axios.get('/api/cart/', config);
export const removeCartById = (id) => axios.delete(`/api/cart/${id}`);
export const removeCart = () => axios.delete(`/api/cart/`);