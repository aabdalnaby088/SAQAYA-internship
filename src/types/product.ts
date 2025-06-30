//  type rate for products rating
type rate = {
  rate: number;
  count: number;
};

//  type Product for products data we get from server
export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  rating: rate;
}

//  type StoredCartItem for cart items stored in local storage
export interface StoredCartItem {
  id: number;
  quantity: number;
}
