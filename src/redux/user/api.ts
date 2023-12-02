import axios from 'axios';
import { ProfileProps } from './types';

export const getUserInfo = (payload: unknown) => axios.get('user', { params: payload });

export const getUsers = () => axios.get('users');

export const updateUser = (payload: ProfileProps) => axios.post('users/update', payload);
