//  type rate for products rating
type rate = {
  rate: number;
  count: number;
};

//  type Product for products data
export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  rating: rate;
}

export interface StoredCartItem {
  id: number;
  quantity: number;
}