import { UserProps } from 'shared/types/User';

export interface UserInitialState {
  user: UserProps;
  users: UserProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}

export interface ProfileModelProps {
  id: string;
  name: string;
  email: string;
  password?: string | undefined;
  currentPassword?: string | undefined;
  confPassword?: string | undefined;
}
