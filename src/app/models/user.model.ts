import { Name } from './name.model';

export interface User {
  id: number;
  token: string;
  name: Name;
  login: string;
  password: string;
}
