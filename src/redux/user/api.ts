// Packages
import axios from 'axios';

// Utilities
import { ProfileModelProps } from './types';

// Calls

export const getUserInfo = (payload: unknown) => axios.get('user', { params: payload });

export const updateUser = (payload: ProfileModelProps) => axios.post('users/update', payload);
