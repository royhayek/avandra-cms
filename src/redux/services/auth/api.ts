import axios from 'axios';
import { LoginProps } from './types';

export const login = ({ email, password }: LoginProps) => axios.post('auth/login', { email, password });

export const logout = ({ refreshToken }) => axios.post('auth/logoutAll', { refreshToken });
