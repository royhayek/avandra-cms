// Packages
import axios from 'axios';

// Calls

export const getDestinations = () => axios.get('destination/list');

export const getDestination = (_id: string) => axios.get(`destination/read/${_id}`);

export const modifyDestination = (payload: FormData) => {
  return axios.patch(`destination/update/${payload.get('_id')}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const createDestination = (payload: FormData) => {
  return axios.post('destination/create', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const deleteDestination = (_id: number) => axios.delete(`destination/delete/${_id}`, {});
