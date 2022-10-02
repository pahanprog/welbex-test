import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getItems } from "../controllers/table";
import { TableItem, ValidationError } from "../types";
import { FilterContext } from "./FilterProvider";
import { SortingContext } from "./SortingProvider";

export const TableItemsContext = createContext({} as TableItemsContextProps);

interface TableItemsContextProps {
  items: { [key: string]: any }[];
  page: number;
  maxPage: number;
  toPrevPage: () => void;
  toNextPage: () => void;
  handleSorting: () => void;
  handleSearch: () => void;
  handleSearchReset: () => void;
  handleCreate: (item: TableItem) => void;
}

interface Props {
  children?: React.ReactNode;
}

// main functionality and data provider
const TableItemsProvider = ({ children }: Props) => {
  const { filterField, filterSetting, filterValue } = useContext(FilterContext);
  const { order, sortingField } = useContext(SortingContext);
  // items rendered in table
  const [items, setItems] = useState<{ [key: string]: any }[]>([]);
  // current page
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  const onSuccessFetch = (items: TableItem[], count: number) => {
    setItems(items);
    setMaxPage(Math.ceil(count / 5));
  };

  const onErrorFetch = (errors: ValidationError[]) => {
    console.error(errors);
  };

  const toPrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const toNextPage = () => {
    if (page + 1 < maxPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSorting = () => {
    if (filterField && filterSetting && filterValue) {
      getItems(
        page,
        onSuccessFetch,
        onErrorFetch,
        { order: order, orderField: sortingField.toLowerCase() },
        {
          field: filterField.toLowerCase(),
          setting: filterSetting,
          searchValue: filterValue.toLowerCase(),
        }
      );
      return;
    }

    getItems(page, onSuccessFetch, onErrorFetch, {
      order: order,
      orderField: sortingField.toLowerCase(),
    });
  };

  useEffect(() => {
    if (sortingField) {
      handleSorting();
    }
  }, [order, sortingField]);

  const handleSearch = () => {
    if (order && sortingField) {
      getItems(
        page,
        onSuccessFetch,
        onErrorFetch,
        { order, orderField: sortingField.toLowerCase() },
        {
          field: filterField.toLowerCase(),
          setting: filterSetting,
          searchValue: filterValue.toLowerCase(),
        }
      );
    }

    getItems(page, onSuccessFetch, onErrorFetch, undefined, {
      field: filterField.toLowerCase(),
      setting: filterSetting,
      searchValue: filterValue.toLowerCase(),
    });
  };

  const handleSearchReset = () => {
    refresh();
  };

  const handleCreate = () => {
    refresh();
  };

  const refresh = () => {
    if (order && sortingField) {
      handleSorting();
      return;
    }
    if (filterField && filterSetting && filterValue) {
      handleSearch();
      return;
    }
    getItems(page, onSuccessFetch, onErrorFetch);
  };

  useEffect(() => {
    refresh();
  }, [page]);

  return (
    <TableItemsContext.Provider
      value={{
        items,
        page,
        maxPage,
        toPrevPage,
        toNextPage,
        handleSorting,
        handleSearch,
        handleSearchReset,
        handleCreate,
      }}
    >
      {children}
    </TableItemsContext.Provider>
  );
};

export default TableItemsProvider;
