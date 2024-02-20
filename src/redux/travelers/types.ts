import { TravelOptionProps } from 'shared/types/Traveler';

export interface TravelersInitialState {
  budgets: TravelOptionProps[] | null;
  travelers: TravelOptionProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
