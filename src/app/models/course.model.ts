import { Author } from './author.model';

export interface Course {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  topRated: boolean;
  authors: Author[];
}
