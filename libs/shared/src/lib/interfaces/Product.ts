export interface IProduct { 
  description: string;
  name: string;
  price: number;
  image?: string;
  designer?: string;
  colors?: string[]; // ✅ تعديل النوع ليكون مصفوفة
  category: string;
  isFeatured?: boolean;
}

