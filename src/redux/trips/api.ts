// Packages
import axios from 'axios';

// Calls

export const getTrips = () => axios.get('trip/list');

export const deleteTrip = (_id: number) => axios.delete(`trip/delete/${_id}`, {});
