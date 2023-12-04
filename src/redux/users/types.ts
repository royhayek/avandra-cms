// Utilities
import { UserProps } from 'shared/types/User';

export interface UserInitialState {
  data: UserProps[] | null;
  loading: boolean;
  updating: boolean;
  error: unknown | string | null;
}
