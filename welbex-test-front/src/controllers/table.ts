import axios from "axios";
import { TableItem, TableItemCreate, ValidationError } from "../types";

// get items by page and optional query and sorting parameters
const getItems = (
  page: number,
  onSuccess: (items: TableItem[], count: number) => void,
  onError: (errors: ValidationError[]) => void,
  order?: {
    orderField: string;
    order: string;
  },
  query?: {
    field: string;
    setting: string;
    searchValue: string;
  }
) => {
  axios({
    method: "get",
    url: "/table",
    params: { ...query, ...order, page: page },
  })
    .then((res) => {
      onSuccess(
        res.data.items.map(
          (item: any) =>
            ({
              id: item.id,
              date: new Date(item.date),
              amount: item.amount,
              distance: item.distance,
              name: item.name,
            } as TableItem)
        ) as TableItem[],
        parseInt(res.data.count)
      );
    })
    .catch((err) => {
      onError(err.response.data);
    });
};

// create item
const createItem = (
  item: TableItemCreate,
  onSuccess: (item: TableItem) => void,
  onError: (errors: ValidationError[]) => void
) => {
  axios({
    method: "post",
    url: "/table",
    data: { ...item },
  })
    .then(({ data }) => {
      onSuccess({
        id: data.id,
        amount: data.amount,
        date: new Date(data.date),
        distance: data.distance,
        name: data.name,
      } as TableItem);
    })
    .catch((err) => {
      console.error(err);
      onError(err.response.data);
    });
};

export { getItems, createItem };
