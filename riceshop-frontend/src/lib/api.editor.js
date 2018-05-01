import axios from 'axios';

export const editorImageUpload = (fd, config) => axios.post(`/api/uploads/editor/image`, fd, config);
export const getPostItemById = (id) => axios.get(`/api/post/${id}`);
