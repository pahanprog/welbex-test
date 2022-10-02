import React from "react";
import FilterProvider from "./FilterProvider";
import SortingProvider from "./SortingProvider";
import TableItemsProvider from "./TableItemsProvider";

interface Props {
  children?: React.ReactNode;
}

// context provider that accumulates all context providers
const ContextProvider = ({ children }: Props) => {
  return (
    <FilterProvider>
      <SortingProvider>
        <TableItemsProvider>{children}</TableItemsProvider>
      </SortingProvider>
    </FilterProvider>
  );
};

export default ContextProvider;
