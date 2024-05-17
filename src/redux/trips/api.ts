// Packages
import axios from 'axios';

// Calls

export const getTrips = () => axios.get('trip/list');

export const getTrip = (_id: string) => axios.get(`trip/read/${_id}`);

export const deleteTrip = (_id: string) => axios.delete(`trip/delete/${_id}`, {});
