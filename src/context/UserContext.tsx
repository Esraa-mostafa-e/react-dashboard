import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, UserContextProps } from '../types/users.types';

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

  const filterUsersLocally = (search: string) => {
    setSearchTerm(search);
    const filtered = users.filter(user =>
      [user.firstName, user.gender, user.email, user.birthDate, user.id.toString()].some(field =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  };

  const applyFilter = (field: string, value: string) => {
    setFilters({ [field]: value });
    setCurrentPage(1); 
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