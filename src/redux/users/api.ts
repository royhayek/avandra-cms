// Packages
import axios from 'axios';

// Utilities
import { UserProps } from 'shared/types/User';

// Calls

export const getUsers = () => axios.get('user/list');

export const createUser = (payload: UserProps) => axios.post('user/create', payload);

export const updateUser = (payload: UserProps) => axios.patch(`user/update/${payload._id}`, payload);

export const deleteUser = (_id: number) => axios.delete(`user/delete/${_id}`, {});
