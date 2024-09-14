import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Product } from '../types/products.types';

interface ProductContextProps {
  products: Product[];
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filterProductsLocally: (search: string) => void;
  applyFilter: (field: string, value: string) => void;
  searchTerm: string;
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const apiURL = 'https://dummyjson.com/products';

  const fetchProducts = () => {
    const params = {
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
      ...filters,
    };

    axios
      .get(apiURL, { params })
      .then(response => {
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [pageSize, currentPage, filters]);

  const filterProductsLocally = (search: string) => {
    setSearchTerm(search);
    const filtered = products.filter(product =>
      [product.title, product.description, product.category, product.brand, product.sku, product.id.toString()].some(field =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  };

  const applyFilter = (field: string, value: string) => {
    setFilters({ [field]: value });
    setCurrentPage(1); 
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        filterProductsLocally,
        applyFilter,
        searchTerm,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};