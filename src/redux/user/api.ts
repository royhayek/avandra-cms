import axios from 'axios';
import { ProfileModelProps } from './types';

export const getUserInfo = (payload: unknown) => axios.get('user', { params: payload });

export const updateUser = (payload: ProfileModelProps) => axios.post('users/update', payload);
