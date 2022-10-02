export interface TableItem {
  id: number;
  date: Date;
  name: string;
  amount: number;
  distance: number;
}

export interface ValidationError {
  param: string;
  message: string;
}

export interface TableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
}

export interface TableItemCreate {
  name: string;
  amount: string;
  distance: string;
}
