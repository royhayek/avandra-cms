import { ArticleProps } from 'shared/types/Article';

export interface ArticleInitialState {
  data: ArticleProps[] | null;
  loading: boolean;
  error: unknown | string | null;
}
