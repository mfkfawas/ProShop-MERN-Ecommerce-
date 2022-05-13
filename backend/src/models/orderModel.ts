import mongoose, { Document, Types } from 'mongoose';

interface OrderItemsType extends Document {
  name: string;
  price: number;
  qty: number;
  image: string;
  producrId: Types.ObjectId;
}

interface OrderType extends Document {
  user: Types.ObjectId;
  orderItems: OrderItemsType[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const orderItemsSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide the name of the product'] },
  qty: { type: Number, required: [true, 'Please provide the quantity of the product'] },
  price: { type: Number, required: [true, 'Please provide the price of the product'] },
  image: { type: String, required: [true, 'Please provide the image of the product'] },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please provide the product'],
    ref: 'Product',
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide the user who ordered item.'],
      ref: 'User',
    },
    orderItems: [orderItemsSchema],
    shippingAddress: {
      address: { type: String, required: [true, 'Please provide the shipping address.'] },
      city: { type: String, required: [true, 'Please provide the shipping city.'] },
      postalCode: {
        type: String,
        required: [true, 'Please provide the shipping postal code.'],
      },
      country: { type: String, required: [true, 'Please provide the shipping country.'] },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please provide a payment method.'],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: [true, 'Please provide a tax price.'],

      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, 'Please provide a shipping price.'],

      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide a total price.'],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'Please provide a payment status.'],
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: [true, 'Please provide a delivery status.'],
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderType>('Order', orderSchema);

export default Order;
