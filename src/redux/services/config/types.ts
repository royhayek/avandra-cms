import { ConfigProps } from 'shared/types/Config';

export interface ConfigInitialState {
  data: ConfigProps | null;
  loading: boolean;
  error: unknown | string | null;
}
