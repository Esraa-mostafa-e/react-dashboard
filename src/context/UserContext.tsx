import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
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

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const apiURL = 'https://dummyjson.com/users';

  // Fetch users based on filters and page size
  const fetchUsers = () => {
    const params = {
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
      ...filters,
    };

    axios
      .get(apiURL, { params })
      .then(response => {
        const fetchedUsers = response.data.users;
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [pageSize, currentPage, filters]);

  // Handle client-side search
  const filterUsersLocally = (search: string) => {
    setSearchTerm(search);
    const filtered = users.filter(user =>
      [user.firstName, user.lastName, user.email, user.id.toString()].some(field =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  };

  // Handle other filters (reset others when one changes)
  const applyFilter = (field: string, value: string) => {
    setFilters({ [field]: value });
    setCurrentPage(1); // Reset to first page
  };

  return (
    <UserContext.Provider
      value={{
        users: filteredUsers,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        filterUsersLocally,
        applyFilter,
        searchTerm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};