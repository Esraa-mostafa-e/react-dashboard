import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const SearchInput = () => {
  const userContext = useContext(UserContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!userContext) return null;

  const { filterUsersLocally } = userContext;

  const toggleSearchInput = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterUsersLocally(value);
  };

  return (
    <div>
      <button onClick={toggleSearchInput}>🔍</button>
      {isSearchVisible && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by ID, name, or email..."
        />
      )}
    </div>
  );
};

export default SearchInput;