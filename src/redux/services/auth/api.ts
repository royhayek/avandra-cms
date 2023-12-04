// Packages
import axios from 'axios';

// Utilities
import { LoginProps } from './types';

// Calls

export const login = ({ email, password }: LoginProps) => axios.post('auth/login', { email, password });

export const logout = ({ refreshToken }) => axios.post('auth/logoutAll', { refreshToken });
