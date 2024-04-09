// Interfaces
import { MessageProps } from 'shared/types/Message';
import { FaqCategoryProps } from 'shared/types/FaqCategory';

export interface FaqsInitialState {
  loading: boolean;
  error: unknown | string | null;
  faqQuestions: MessageProps[] | null;
  faqCategories: FaqCategoryProps[] | null;
}
