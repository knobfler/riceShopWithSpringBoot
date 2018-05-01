import axios from 'axios';

export const postItem = ({title, markdown, option, price}) => axios.post('/api/post/', {title, markdown, option, price});
export const getPostItemById = (id) => axios.get(`/api/post/${id}`);
export const getPostItemList = () => axios.get('/api/post/');
export const deleteItemById = (id) => axios.delete(`/api/post/${id}`);
export const updateItemById = ({id, title, markdown, option, price}) => axios.patch(`/api/post/${id}`, {id, title, markdown, option, price});