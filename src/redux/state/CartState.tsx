export interface CartState {
  items: Record<string, Cart>;
  totalPrice: number;
  totalCount: number;
}
export interface Cart {
  items: TProductItem[];
  totalPrice: number;
  totalCount: number;
}

export type TProductItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};
