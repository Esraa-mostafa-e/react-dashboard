export interface ICustomTable<T> {
  columns: {
    key: string;
    title: string;
    dataIndex: keyof T; // Use keyof T to ensure that dataIndex matches keys of the provided type
  }[] | undefined;
  dataSources: T[] | undefined; // T[] instead of { [key: string]: T }[]
  totalData: number | undefined;
  loading: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}
