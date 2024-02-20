import { DestinationProps } from 'shared/types/Destination';

export interface DestinationInitialState {
  data: DestinationProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
