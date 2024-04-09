import { WalkthroughProps } from 'shared/types/Walkthrough';

export interface WalkthroughInitialState {
  data: WalkthroughProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
