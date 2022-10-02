import React from "react";
import CreateItemModal from "./components/CreateItemModal";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

function App() {
  return (
    <div className="app_container">
      <Filters />
      <Table />
      <CreateItemModal />
      <Pagination />
    </div>
  );
}

export default App;
