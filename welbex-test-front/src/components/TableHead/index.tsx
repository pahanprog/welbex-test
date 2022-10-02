import React, { useContext, useEffect } from "react";
import { SortingContext } from "../../context/SortingProvider";
import { TableColumn } from "../../types";
import "./styles.css";

interface Props {
  columns: TableColumn[];
}

// table head component with sorting logic
const TableHead = ({ columns }: Props) => {
  const { order, setOrder, setSortingField, sortingField } =
    useContext(SortingContext);

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortingField && order === "asc" ? "desc" : "asc";
    setSortingField(accessor);
    setOrder(sortOrder);
  };

  useEffect(() => {
    if (order !== "asc") {
      setOrder("asc");
    }
  }, [sortingField]);

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => (
          <th
            key={accessor}
            onClick={sortable ? () => handleSortingChange(accessor) : () => {}}
            className={
              sortable
                ? sortingField === accessor && order === "asc"
                  ? "up"
                  : sortingField === accessor && order === "desc"
                  ? "down"
                  : "default"
                : ""
            }
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
