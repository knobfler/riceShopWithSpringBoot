import axios from 'axios';

export const postItem = ({title, markdown, option, price}) => axios.post('/api/post/', {title, markdown, option, price});
export const getPostItemById = (id) => axios.get(`/api/post/${id}`);
export const getPostItemList = () => axios.get('/api/post/');