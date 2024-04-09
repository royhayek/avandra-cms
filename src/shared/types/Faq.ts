// Interfaces
import { LanguageProps } from './Language';

export interface FaqProps {
  language: LanguageProps;
  category: string;
  question: string;
  answer: string;
  order: number;
}
