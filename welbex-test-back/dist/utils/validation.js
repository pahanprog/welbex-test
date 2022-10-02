"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTableOrder = exports.validateTableSearch = exports.validateTableItem = void 0;
const validateTableItem = (item) => {
    let errors = [];
    if (!item.name || item.amount === undefined || item.distance === undefined) {
        if (!item.name) {
            errors.push({
                param: "name",
                message: "Field is required",
            });
        }
        if (item.amount === undefined) {
            errors.push({
                param: "amount",
                message: "Field is required",
            });
        }
        if (item.distance === undefined) {
            errors.push({
                param: "distance",
                message: "Field is required",
            });
        }
        return errors;
    }
    if (item.name.length < 4) {
        errors.push({
            param: "name",
            message: "Should be at least 4 characters long",
        });
    }
    if (!parseInt(item.amount) || parseInt(item.amount) <= 0) {
        errors.push({
            param: "amount",
            message: "Should be a positive number",
        });
    }
    if (!parseInt(item.distance) || parseInt(item.distance) <= 0) {
        errors.push({
            param: "distance",
            message: "Should be a positive number",
        });
    }
    return errors;
};
exports.validateTableItem = validateTableItem;
const validateTableSearch = (query) => {
    let errors = [];
    if (query.field || query.setting || query.searchValue) {
        if (query.field === undefined) {
            errors.push({ param: "field", message: "Field is required" });
        }
        if (query.setting === undefined) {
            errors.push({ param: "setting", message: "Field is required" });
        }
        if (query.searchValue === undefined || !query.searchValue) {
            errors.push({ param: "searchValue", message: "Field is required" });
        }
        if (errors.length > 0) {
            return errors;
        }
        if (query.field !== "name" &&
            query.field !== "amount" &&
            query.field !== "distance") {
            errors.push({ param: "field", message: "Unsupported field" });
        }
        if (query.setting !== "Equal" &&
            query.setting !== "Includes" &&
            query.setting !== "Bigger" &&
            query.setting !== "Smaller") {
            errors.push({ param: "setting", message: "Unsupported setting" });
        }
        return errors;
    }
    return errors;
};
exports.validateTableSearch = validateTableSearch;
const validateTableOrder = (field, order) => {
    let errors = [];
    if (field || order) {
        if (field === undefined) {
            errors.push({ param: "orderField", message: "Field is required" });
        }
        if (order === undefined) {
            errors.push({ param: "order", message: "Field is required" });
        }
        if (errors.length > 0) {
            return errors;
        }
        if (field !== "name" && field !== "amount" && field !== "distance") {
            errors.push({ param: "orderField", message: "Unsupported field" });
        }
        if (order !== "asc" && order !== "desc") {
            errors.push({ param: "order", message: "Unsupported order" });
        }
    }
    return errors;
};
exports.validateTableOrder = validateTableOrder;
//# sourceMappingURL=validation.js.map