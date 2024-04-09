// Interfaces
import { MessageProps } from 'shared/types/Message';

export interface MessagesInitialState {
  data: MessageProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
