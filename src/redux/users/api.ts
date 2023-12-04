// Packages
import axios from 'axios';

// Utilities
import { UserProps } from 'shared/types/User';

// Calls

export const getUsers = () => axios.get('users');

export const updateUser = (payload: UserProps) => axios.post('users/update', payload);

export const deleteUser = (_id: number) => axios.post('users/delete', { _id });
