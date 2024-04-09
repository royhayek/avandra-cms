// Packages
import axios from 'axios';

// Utilities
import { WalkthroughProps } from 'shared/types/Walkthrough';

// Calls

export const getWalkthrough = () => axios.get('walkthrough/list');

export const modifyWalkthrough = ({ _id, title, description, image }: WalkthroughProps) => {
  return axios.patch(
    `walkthrough/update/${_id}`,
    { title, description, image },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const createWalkthrough = ({ _id, language, title, description, image }: WalkthroughProps) => {
  return axios.post(
    'walkthrough/create',
    { _id, language, title, description, image },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const deleteWalkthrough = (_id: number) => axios.delete(`walkthrough/delete/${_id}`, {});
