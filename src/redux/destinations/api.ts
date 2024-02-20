// Packages
import axios from 'axios';

// Utilities
import { DestinationProps } from 'shared/types/Destination';

// Calls

export const getDestinations = () => axios.get('destination/list');

export const modifyDestination = ({ _id, name, country, enabled, image }: DestinationProps) => {
  return axios.patch(
    `destination/update/${_id}`,
    { name, country, enabled, image },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const createDestination = ({ _id, name, country, enabled, image }: DestinationProps) => {
  return axios.post(
    'destination/create',
    { _id, name, country, enabled, image },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const deleteDestination = (_id: number) => axios.delete(`destination/delete/${_id}`, {});
