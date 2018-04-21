import axios from 'axios';

export const addCart = ({id, title, amount, thumbnailImage, totalPrice}) => axios.post('/api/cart/', {id, title, amount, thumbnailImage, totalPrice});
export const getCartList = () => axios.get('/api/cart/');
export const removeCartById = (id) => axios.delete(`/api/cart/${id}`);