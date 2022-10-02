"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../utils/validation");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const page = parseInt(req.query.page);
    const query = {
        field: req.query.field,
        setting: req.query.setting,
        searchValue: req.query.searchValue,
    };
    const sorting = {
        field: req.query.orderField,
        order: req.query.order,
    };
    let validationErrors = (0, validation_1.validateTableSearch)(query);
    if (validationErrors.length > 0) {
        res.status(400).send({ errors: validationErrors });
        return;
    }
    validationErrors = (0, validation_1.validateTableOrder)(sorting.field, sorting.order);
    if (validationErrors.length > 0) {
        res.status(400).send({ errors: validationErrors });
        return;
    }
    if (page < 0) {
        res.status(400).send({
            errors: [
                { param: "page", message: "should be a positive number" },
            ],
        });
        return;
    }
    const handlePGResponse = (err, items, count) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.status(200).send({
            items: items.rows,
            count: count.rows[0].count,
        });
    };
    if (query.field) {
        const sqlQuery = `WHERE LOWER(${query.field}) ${query.setting === "Equal"
            ? "="
            : query.setting === "Includes"
                ? "LIKE"
                : query.setting === "Bigger"
                    ? ">"
                    : "<"} ${query.setting === "Includes"
            ? `'%${query.searchValue}%'`
            : `'${query.searchValue}'`}`;
        if (sorting.field) {
            const sqlOrder = `ORDER BY ${sorting.field} ${sorting.order}`;
            db_1.default.query(`SELECT * FROM "table" ${sqlQuery} ${sqlOrder} LIMIT 5 OFFSET $1`, [page * 5], (err, items) => {
                if (err) {
                    console.error(err);
                    res.status(400).send(err);
                }
                db_1.default.query(`SELECT COUNT(id) FROM "table" ${sqlQuery}`, [], (err, count) => handlePGResponse(err, items, count));
            });
            return;
        }
        db_1.default.query(`SELECT * FROM "table" ${sqlQuery} ORDER BY date LIMIT 5 OFFSET $1`, [page * 5], (err, items) => {
            if (err) {
                console.error(err);
                res.status(400).send(err);
            }
            db_1.default.query(`SELECT COUNT(id) FROM "table" ${sqlQuery}`, [], (err, count) => handlePGResponse(err, items, count));
        });
        return;
    }
    if (sorting.field) {
        const sqlOrder = `ORDER BY ${sorting.field} ${sorting.order}`;
        db_1.default.query(`SELECT * FROM "table" ${sqlOrder} LIMIT 5 OFFSET $1`, [page * 5], (err, items) => {
            if (err) {
                console.error(err);
                res.status(400).send(err);
            }
            db_1.default.query(`SELECT COUNT(id) FROM "table"`, [], (err, count) => handlePGResponse(err, items, count));
        });
        return;
    }
    db_1.default.query(`SELECT * FROM "table" ORDER BY date LIMIT 5 OFFSET $1`, [page * 5], (err, items) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        db_1.default.query(`SELECT COUNT(id) FROM "table"`, [], (err, count) => handlePGResponse(err, items, count));
    });
});
router.post("/", (req, res) => {
    const input = req.body;
    const validationErrors = (0, validation_1.validateTableItem)(input);
    if (validationErrors.length > 0) {
        res.status(400).send({ errors: validationErrors });
        return;
    }
    db_1.default.query(`INSERT INTO "table" (name, amount, distance) VALUES($1,$2,$3) RETURNING *`, [input.name, input.amount, input.distance], (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows[0]);
    });
});
exports.default = router;
//# sourceMappingURL=table.js.map