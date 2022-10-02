import React from "react";
import { TableColumn } from "../../types";
import "./styles.css";

interface Props {
  tableData: { [key: string]: any };
  columns: TableColumn[];
}

// table body component
const TableBody = ({ columns, tableData }: Props) => {
  return (
    <tbody>
      {tableData.map((data: any) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData =
                Object.prototype.toString.call(data[accessor]) ===
                "[object Date]"
                  ? data[accessor].toLocaleString()
                  : data[accessor];
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
