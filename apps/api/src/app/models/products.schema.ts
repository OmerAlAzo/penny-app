import { IProduct } from '@penny-app/shared';
import { Schema } from 'mongoose';



export const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, min: 0, required: true },
    image: { type: String, required: false },
    designer: { type: String, required: false },
    colors: { type: [String], required: false }, // ✅ تعديل الحقل ليقبل مصفوفة
    category: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);
