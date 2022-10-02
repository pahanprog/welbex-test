import React, { createContext, useState } from "react";

export const FilterContext = createContext({} as FilterContextProps);

interface FilterContextProps {
  filterField: string;
  filterSetting: string;
  filterValue: string;
  setFilterField: (value: string) => void;
  setFilterSetting: (value: string) => void;
  setFilterValue: (value: string) => void;
}

interface Props {
  children?: React.ReactNode;
}

// filters context provider
const FilterProvider = ({ children }: Props) => {
  const [filterField, setFilterField] = useState("");
  const [filterSetting, setFilterSetting] = useState("");
  const [filterValue, setFilterValue] = useState("");

  return (
    <FilterContext.Provider
      value={{
        filterField,
        filterSetting,
        filterValue,
        setFilterField,
        setFilterSetting,
        setFilterValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
