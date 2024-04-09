import { LanguageProps } from './Language';

export interface ArticleProps {
  _id: number;
  name: string;
  image: string;
  date: string;
  details: string;
  language: string | LanguageProps;
}
