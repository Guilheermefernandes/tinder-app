export type Sex = 'MASCULINE' | 'FEMININE';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  slug: string;
  sex: Sex;
  description?: string
  interactions: number
  matched: number
  photos : number
  avatar?: string
}