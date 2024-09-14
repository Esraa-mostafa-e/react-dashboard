import { CancelTokenSource } from "axios";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    username: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
    eyeColor: string;
    bloodGroup: string;
    height: number;
    weight: number;
    [key: string]: any; 
}

interface FetchUserDataParams {
    page: number;
    limit: number;
    filters?: Record<string, string>;
    cancelToken?: CancelTokenSource;
  }

  interface UserContextProps {
    users: User[];
    pageSize: number;
    setPageSize: (size: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    filterUsersLocally: (search: string) => void;
    applyFilter: (field: string, value: string) => void;
    searchTerm: string;
  }

export type { User, FetchUserDataParams, UserContextProps }