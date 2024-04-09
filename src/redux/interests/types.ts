import { InterestProps } from 'shared/types/Interest';
import { PaginationProps } from 'shared/types/Pagination';

export interface InterestsInitialState {
  data: InterestProps[] | null;
  loading: boolean;
  error: unknown | string | null;
  pagination: PaginationProps | null;
}
