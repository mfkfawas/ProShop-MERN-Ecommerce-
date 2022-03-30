export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description?: string;
  brand?: string;
  category?: string;
  price: number;
  countInStock?: number;
  rating: number;
  numReviews: number;
}

export interface RatingType {
  value: number;
  text: string;
  color?: string;
}
