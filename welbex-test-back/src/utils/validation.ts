import { TableCreate, ValidationError } from "../types";

// validation schema for table item
const validateTableItem = (item: TableCreate) => {
  let errors: ValidationError[] = [];

  // check for incomplete input
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

  // validate parameters if they all exist
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

// validation schema for search query parameters
const validateTableSearch = (query: {
  field: string;
  setting: string;
  searchValue: string;
}) => {
  let errors: ValidationError[] = [];

  // validate only if there is at least one parameter
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

    if (
      query.field !== "name" &&
      query.field !== "amount" &&
      query.field !== "distance"
    ) {
      errors.push({ param: "field", message: "Unsupported field" });
    }

    if (
      query.setting !== "Equal" &&
      query.setting !== "Includes" &&
      query.setting !== "Bigger" &&
      query.setting !== "Smaller"
    ) {
      errors.push({ param: "setting", message: "Unsupported setting" });
    }

    return errors;
  }

  return errors;
};

// validation schema for sorting parameters
const validateTableOrder = (field: string, order: string) => {
  let errors: ValidationError[] = [];

  // validate only if there is at least one parameter
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

export { validateTableItem, validateTableSearch, validateTableOrder };
