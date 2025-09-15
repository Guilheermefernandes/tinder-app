export type Sex = 'MASCULINE' | 'FEMININE';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  slug: string;
  sex: Sex;
}