type rate = {
    rate: number;
    count: number;
};

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  rating: rate;
}


export const  dummyData: Product[] = [
        {
          id: 1,
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          price: 109.95,
          description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          rating: {rate: 4.5, count: 12},
        },
        {
          id: 2,
          title: "Mens Casual Premium Slim Fit T-Shirts",
          image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          price: 22.3,
          description: "lim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          rating: { rate: 4.5, count: 12 },
        },
  ] 

