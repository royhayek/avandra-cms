// Packages
import axios from 'axios';

// Utilities
import { MessageProps } from 'shared/types/Message';

// Calls

export const getMessages = () => axios.get('message/list');

export const updateMessage = ({ _id, status }: MessageProps) => {
  return axios.patch(`message/update/${_id}`, { status });
};

export const deleteMessage = (_id: number) => axios.delete(`message/delete/${_id}`, {});
