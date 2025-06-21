import type { Product } from "../types/product";

//  base function get products from server
async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

//  base function get product details from server
async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return {} as Product;
  }
}

export { getProducts, getProduct };
