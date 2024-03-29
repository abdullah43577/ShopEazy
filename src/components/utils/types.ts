export interface Products {
  category: string;
  description: string;
  _id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
  isAddedToWishlist: boolean;
  isAddedToCart: boolean;
  quantity: number;
}
