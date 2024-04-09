import { TripProps } from 'shared/types/Trip';

export interface TripInitialState {
  data: TripProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
