import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct, } from '@penny-app/shared';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<IProduct>,
  ) { }

  async createProduct(createProductDto: any): Promise<IProduct> {
    try {
      const { name, description, price, image, category, designer, colors, isFeatured } = createProductDto;


      // ✅ التأكد من أن `colors` هو مصفوفة، وإذا لم يكن، تحويله إلى مصفوفة فارغة
      const processedColors = Array.isArray(colors) ? colors : [];
      const product = new this.productModel({
        name,
        description,
        price,
        image: image || '',
        category,
        designer,
        colors: processedColors, // ✅ استخدام المصفوفة بعد المعالجة
        isFeatured,
      });
      return await product.save();
    } catch (error) {
      throw new Error(`error in createProduct : ${error.message}`);
    }
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    try {
      await this.productModel.deleteOne({ _id: id });
      return { message: 'product deleted successfully' };
    } catch (error) {
      throw new Error(`error in deleteProduct : ${error.message}`);
    }
  }

  async updateProduct(id: string, updateProductDto: any): Promise<IProduct> {
    try {
      const { name, description, price, image, category, designer, colors, isFeatured } = updateProductDto;
      // Process colors array
      const processedColors = Array.isArray(colors) ? colors : [];

      // Update the product
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
          image: image,
          category,
          designer,
          colors: processedColors,
          isFeatured,
        },
        { new: true } // Return the updated document
      );

      if (!updatedProduct) {
        throw new Error('Product not found');
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error in updateProduct: ${error.message}`);
    }
  }

  async getProducts(limit: number, offset: number): Promise<{ products: IProduct[], count: number }> {
    try {
      const products = await this.productModel.find({}).skip(offset).limit(limit).sort({ createdAt: -1 });
      const count = await this.productModel.countDocuments({});
      return {
        products: products,
        count: count
      };
    } catch (error) {
      throw new Error(`error in getProducts : ${error.message}`);
    }
  }
  async getLandingPageProducts(): Promise<{ products: IProduct[] }> {
    try {
      const products = await this.productModel.find({}).limit(50).sort({ createdAt: -1 });
      return {
        products: products
      };
    } catch (error) {
      throw new Error(`error in getProducts : ${error.message}`);
    }
  }

}
