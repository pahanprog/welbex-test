import React, { createContext, useState } from "react";

export const SortingContext = createContext({} as SortingContextProps);

interface SortingContextProps {
  sortingField: string;
  order: string;
  setSortingField: (value: string) => void;
  setOrder: (value: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

// sorting parameters context provider
const SortingProvider = ({ children }: Props) => {
  const [sortingField, setSortingField] = useState("");
  const [order, setOrder] = useState("asc");

  return (
    <SortingContext.Provider
      value={{ order, setOrder, setSortingField, sortingField }}
    >
      {children}
    </SortingContext.Provider>
  );
};

export default SortingProvider;
