export interface ICustomTable<T> {
  columns:
  | {
    key: string
    title: string
    dataIndex: string
  }[]
  | undefined
  dataSources: { [key: string]: T }[] | undefined
  totalData: number | undefined
}
