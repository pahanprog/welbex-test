export interface TableCreate {
  name: string;
  amount: string;
  distance: string;
}

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
