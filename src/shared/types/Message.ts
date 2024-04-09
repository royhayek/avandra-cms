import { UserProps } from './User';

export interface MessageProps {
  _id: string;
  type?: string;
  status: string;
  message?: string;
  user?: UserProps;
}
