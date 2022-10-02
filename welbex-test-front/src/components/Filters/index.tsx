import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";
import { TableItemsContext } from "../../context/TableItemsProvider";
import Button from "../Button";
import Select from "../Select";
import TextInput from "../TextInput";
import "./styles.css";

// filters component, displays select component to select nedded filters and a text input for search query
const Filters = () => {
  const { handleSearch, handleSearchReset } = useContext(TableItemsContext);
  const {
    filterField,
    filterSetting,
    filterValue,
    setFilterField,
    setFilterSetting,
    setFilterValue,
  } = useContext(FilterContext);

  const handleSearchClick = () => {
    if (filterField && filterSetting && filterValue) {
      handleSearch();
    }
  };

  const handleResetClick = () => {
    if (filterField) {
      setFilterField("");
    }
    if (filterSetting) {
      setFilterSetting("");
    }
    if (filterValue) {
      setFilterValue("");
    }
    handleSearchReset();
  };

  return (
    <div className="filters_container">
      <Select
        options={["Name", "Amount", "Distance"]}
        placeholder="Field to filter"
        selectedOption={filterField}
        setSelectedOption={setFilterField}
      />
      <Select
        options={["Equal", "Includes", "Bigger", "Smaller"]}
        placeholder="Filter setting"
        selectedOption={filterSetting}
        setSelectedOption={setFilterSetting}
      />
      <TextInput
        value={filterValue}
        onChange={setFilterValue}
        placeholder={"Filter value"}
      />
      <Button title="Search" onClick={handleSearchClick} />
      <Button title="Reset" onClick={handleResetClick} />
    </div>
  );
};

export default Filters;
