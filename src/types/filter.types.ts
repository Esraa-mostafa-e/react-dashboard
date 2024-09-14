export interface Option {
    value: string
    label: string
  }
  
  export interface FilterFieldConfig {
    id: string
    selectId?: string
    label: string
    type: string
    options?: Option[]
  }