import type { Product } from "../types/product";


async function getProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    return await response.json();
}



export { getProducts };
