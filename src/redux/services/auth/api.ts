// Packages
import axios from 'axios';

// Utilities
import { LoginProps } from './types';

// Calls

export const login = ({ email, password }: LoginProps) => axios.post('login', { email, password });

export const logout = ({ refreshToken }) => axios.post('logoutAll', { refreshToken });
