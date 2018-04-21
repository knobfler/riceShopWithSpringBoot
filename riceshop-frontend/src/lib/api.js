import axios from 'axios';

export const editorImageUpload = (fd, config) => axios.post(`/api/uploads/editor/image`, fd, config);