import { Router } from "express";
import {
  validateTableItem,
  validateTableOrder,
  validateTableSearch,
} from "../utils/validation";
import db from "../db";
import { TableCreate, TableItem, ValidationError } from "../types";
import { QueryResult } from "pg";

const router = Router();

// get request for table contents
router.get("/", (req, res) => {
  // get page from query
  const page = parseInt(req.query.page as string);
  // get query parameters from query
  const query = {
    field: req.query.field as string,
    setting: req.query.setting as string,
    searchValue: req.query.searchValue as string,
  };
  // get sorting parameters from query
  const sorting = {
    field: req.query.orderField as string,
    order: req.query.order as string,
  };

  // validate query parameters if there is any
  let validationErrors = validateTableSearch(query);

  if (validationErrors.length > 0) {
    res.status(400).send({ errors: validationErrors });
    return;
  }

  // validate sorting parameters if there is any
  validationErrors = validateTableOrder(sorting.field, sorting.order);

  if (validationErrors.length > 0) {
    res.status(400).send({ errors: validationErrors });
    return;
  }

  // validate page
  if (page < 0) {
    res.status(400).send({
      errors: [
        { param: "page", message: "should be a positive number" },
      ] as ValidationError[],
    });
    return;
  }

  // pg response handler
  const handlePGResponse = (
    err: Error,
    items: QueryResult<any>,
    count: QueryResult<any>
  ) => {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    }

    res.status(200).send({
      items: items.rows as TableItem[],
      count: count.rows[0].count,
    });
  };

  // query with where clause if there are query parameters
  if (query.field) {
    const sqlQuery = `WHERE LOWER(${query.field}) ${
      query.setting === "Equal"
        ? "="
        : query.setting === "Includes"
        ? "LIKE"
        : query.setting === "Bigger"
        ? ">"
        : "<"
    } ${
      query.setting === "Includes"
        ? `'%${query.searchValue}%'`
        : `'${query.searchValue}'`
    }`;

    // add sorting clause if there are sorting parameters
    if (sorting.field) {
      const sqlOrder = `ORDER BY ${sorting.field} ${sorting.order}`;

      db.query(
        `SELECT * FROM "table" ${sqlQuery} ${sqlOrder} LIMIT 5 OFFSET $1`,
        [page * 5],
        (err, items) => {
          if (err) {
            console.error(err);
            res.status(400).send(err);
          }
          db.query(
            `SELECT COUNT(id) FROM "table" ${sqlQuery}`,
            [],
            (err, count) => handlePGResponse(err, items, count)
          );
        }
      );

      return;
    }

    db.query(
      `SELECT * FROM "table" ${sqlQuery} ORDER BY date LIMIT 5 OFFSET $1`,
      [page * 5],
      (err, items) => {
        if (err) {
          console.error(err);
          res.status(400).send(err);
        }
        db.query(
          `SELECT COUNT(id) FROM "table" ${sqlQuery}`,
          [],
          (err, count) => handlePGResponse(err, items, count)
        );
      }
    );
    return;
  }

  // add sorting clause if there are sorting parameters
  if (sorting.field) {
    const sqlOrder = `ORDER BY ${sorting.field} ${sorting.order}`;

    db.query(
      `SELECT * FROM "table" ${sqlOrder} LIMIT 5 OFFSET $1`,
      [page * 5],
      (err, items) => {
        if (err) {
          console.error(err);
          res.status(400).send(err);
        }

        db.query(`SELECT COUNT(id) FROM "table"`, [], (err, count) =>
          handlePGResponse(err, items, count)
        );
      }
    );

    return;
  }

  // no sorting or where clause
  db.query(
    `SELECT * FROM "table" ORDER BY date LIMIT 5 OFFSET $1`,
    [page * 5],
    (err, items) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      }

      db.query(`SELECT COUNT(id) FROM "table"`, [], (err, count) =>
        handlePGResponse(err, items, count)
      );
    }
  );
});

router.post("/", (req, res) => {
  // get creation input
  const input = req.body as TableCreate;

  // validate input
  const validationErrors = validateTableItem(input);

  if (validationErrors.length > 0) {
    res.status(400).send({ errors: validationErrors });
    return;
  }

  // db query for item creation
  db.query(
    `INSERT INTO "table" (name, amount, distance) VALUES($1,$2,$3) RETURNING *`,
    [input.name, input.amount, input.distance],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(400).send(err);
      }

      res.status(200).send(result.rows[0] as TableItem);
    }
  );
});

export default router;
