import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const UserFilters = () => {
  const userContext = useContext(UserContext);
  const [filterField, setFilterField] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  if (!userContext) return null;

  const { applyFilter } = userContext;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    applyFilter(filterField, e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterField(e.target.value);
    setFilterValue(''); // Reset value when changing field
  };

  return (
    <div>
      <select onChange={handleFieldChange} value={filterField}>
        <option value="">Select Field</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
      </select>
      <input
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Enter value to filter..."
        disabled={!filterField}
      />
    </div>
  );
};

export default UserFilters;