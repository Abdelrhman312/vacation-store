export type Category = "airpods" | "watches" | "headphones" | "powerbanks";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod =
  | "vodafone_cash"
  | "etisalat_cash"
  | "orange_cash"
  | "instapay";

export interface CheckoutData {
  name: string;
  phone: string;
  governorate: string;
  address: string;
  paymentMethod: PaymentMethod;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
}
