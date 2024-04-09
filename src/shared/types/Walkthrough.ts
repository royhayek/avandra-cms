import { LanguageProps } from './Language';

export interface WalkthroughProps {
  _id: string;
  image: string;
  title: string;
  enabled: boolean;
  description: string;
  language: LanguageProps;
}
