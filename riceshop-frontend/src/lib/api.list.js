import axios from 'axios';

// export const getLastId = () =>
export const getListItem = ({lastId}) => axios.get(`/api/post/more/${lastId}`);
export const getInitialList = () => axios.get('/api/post/initial');