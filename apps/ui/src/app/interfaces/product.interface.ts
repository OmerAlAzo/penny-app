export interface Product {
  _id?: string,
  name: string;
  description: string;
  price: number;
  image: string;
  designer: string;
  colors: string[];
  category: string;
  isFeatured: boolean;
}

