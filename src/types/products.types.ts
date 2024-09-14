import { CancelTokenSource } from "axios";

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
}

interface FetchProductsDataParams {
    page: number;
    limit: number;
    filters?: Record<string, string>;
    cancelToken?: CancelTokenSource;
  }
  
export type { Product, FetchProductsDataParams }