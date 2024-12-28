import mongoose, { Schema, model } from "mongoose";

export type ProductDocument = {
  _id: string;
  name: string;
  quantity: number;
  imgUrl: string;
};

export type ProductsResType = {
  products: ProductDocument[];
  totalProduct: number;
  pageSize: number;
};

export type ProductResType = {
  product: ProductDocument;
};

const ProductSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Products =
  mongoose.models.Product || model<ProductDocument>("Product", ProductSchema);
