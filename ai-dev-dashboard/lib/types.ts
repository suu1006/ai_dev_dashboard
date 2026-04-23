export type Category = 'ALL' | 'BEAUTY' | 'PROCEDURE' | 'FASHION';

export type PersonalColor =
  | 'SPRING_WARM'
  | 'SUMMER_COOL'
  | 'AUTUMN_WARM'
  | 'WINTER_COOL';

export interface Review {
  id: string;
  title: string;
  content: string;
  category: Exclude<Category, 'ALL'>;
  author: string;
  rating: number;
  viewCount: number;
  helpfulCount: number;
  tags: string[];
  image?: string;
  personalColor?: PersonalColor;
  createdAt: string;
}
