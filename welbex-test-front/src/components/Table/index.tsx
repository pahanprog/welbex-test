import React, { useContext } from "react";
import { TableItemsContext } from "../../context/TableItemsProvider";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import "./styles.css";

// table component
const Table = () => {
  const { items } = useContext(TableItemsContext);

  // column labels, accessors (to access parameters from objects) and is sortable setting
  const columns = [
    { label: "Date", accessor: "date", sortable: false },
    { label: "Name", accessor: "name", sortable: true },
    { label: "Amount", accessor: "amount", sortable: true },
    { label: "Distance", accessor: "distance", sortable: true },
  ];

  return (
    <table>
      <TableHead columns={columns} />
      <TableBody tableData={items} columns={columns} />
    </table>
  );
};

export default Table;
