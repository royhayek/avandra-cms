import { TravelOptionProps } from 'shared/types/Traveler';

export interface TravelersInitialState {
  data: TravelOptionProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
