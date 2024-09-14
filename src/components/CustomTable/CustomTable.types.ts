export interface ICustomTable<T> {
  columns: {
    key: string;
    title: string;
    dataIndex: keyof T; 
  }[] | undefined;
  dataSources: T[] | undefined; 
  totalData: number | undefined;
  placeholder: string;
  onPageChange?: (page: number, pageSize: number) => void;
  filterFields?: { id: string; type: string; label: string }[]; 
  initialFilterState?: Record<string, string>; 
  onApplyFilters?: (filters: Record<string, string>) => void; 
}