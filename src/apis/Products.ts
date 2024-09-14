import axios from 'axios';
import { FetchProductsDataParams } from '../types/products.types';

const fetchProductsData = async ({ page, limit, filters, cancelToken }: FetchProductsDataParams) => {
  const params: Record<string, any> = {
    limit,
    skip: (page - 1) * limit,
  };

  let url = 'https://dummyjson.com/products';

  if (filters && Object.keys(filters).length > 0) {
    url += '/filter';
    const filterKeys = Object.keys(filters);
    if (filterKeys.length > 0) {
      params.key = filterKeys[0];
      params.value = filters[filterKeys[0]];
    }
  }

  const response = await axios.get(url, { params, cancelToken: cancelToken?.token });
  return {
    data: response.data.products,
    total: response.data.total,
  };
};

export default fetchProductsData;