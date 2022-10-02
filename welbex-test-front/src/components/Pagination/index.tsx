import React, { useContext } from "react";
import { TableItemsContext } from "../../context/TableItemsProvider";
import NextPage from "../svgs/NextPage";
import PrevPage from "../svgs/PrevPage";
import "./styles.css";

// pagination component? displays current page, max pages and button to change pages
const Pagination = () => {
  const { page, toNextPage, toPrevPage, maxPage } =
    useContext(TableItemsContext);

  return (
    <div className="page_container">
      <div className="page_prev" onClick={toPrevPage}>
        <PrevPage />
      </div>
      {page + 1}/{maxPage}
      <div className="page_next" onClick={toNextPage}>
        <NextPage />
      </div>
    </div>
  );
};

export default Pagination;
