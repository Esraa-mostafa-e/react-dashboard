import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const PageSizeDropdown = () => {
  const userContext = useContext(UserContext);

  if (!userContext) return null;

  const { pageSize, setPageSize } = userContext;

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
  };

  return (
    <select value={pageSize} onChange={handlePageSizeChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
    </select>
  );
};

export default PageSizeDropdown;