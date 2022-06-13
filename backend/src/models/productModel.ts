import mongoose, { Document, Types } from 'mongoose';

interface ReviewType {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

interface ProductType extends Document {
  user: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: ReviewType[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide the admin user'],
      ref: 'User',
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'A product must have a name.'],
      maxlength: [40, 'A product name must have less or equal to 40 characters.'],
      minlength: [10, 'A product name must have more or equal to 10 characters.'],
    },
    image: {
      type: String,
      required: [true, 'A product must have a image.'],
    },
    brand: {
      type: String,
      required: [true, 'A product must have a brand.'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category.'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description.'],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price.'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'A product must have its count in stock.'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<ProductType>('Product', productSchema);

export default Product;
