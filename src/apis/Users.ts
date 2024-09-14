import axios from 'axios';
import { FetchUserDataParams } from '../types/users.types';

const fetchUserData = async ({ page, limit, filters, cancelToken }: FetchUserDataParams) => {
  const params: Record<string, any> = {
    limit,
    skip: (page - 1) * limit,
  };

  let url = 'https://dummyjson.com/users';

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
    data: response.data.users,
    total: response.data.total,
  };
};

export default fetchUserData;