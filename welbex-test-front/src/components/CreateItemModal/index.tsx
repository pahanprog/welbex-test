import React, { useContext, useState } from "react";
import { TableItemsContext } from "../../context/TableItemsProvider";
import { createItem } from "../../controllers/table";
import { TableItem, ValidationError } from "../../types";
import Button from "../Button";
import Modal from "../Modal";
import TextInput from "../TextInput";
import "./styles.css";

// component renders button that controls a modal to create a new table item
const CreateItemModal = () => {
  const { handleCreate } = useContext(TableItemsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState({ name: "", amount: "", distance: "" });
  const [errors, setErrors] = useState({ name: "", amount: "", distance: "" });

  const handleClose = () => {
    setErrors({ name: "", amount: "", distance: "" });
    setValues({ name: "", amount: "", distance: "" });
    setModalVisible(false);
  };

  const onSubmit = () => {
    const onSuccessCreate = (item: TableItem) => {
      handleCreate(item);
      handleClose();
    };

    const onErrorCreate = (errors: ValidationError[]) => {
      errors.forEach((error) => {
        switch (error.param) {
          case "name":
            setErrors((prevErrors) => ({
              ...prevErrors,
              name: error.message,
            }));
            break;
          case "amount":
            setErrors((prevErrors) => ({
              ...prevErrors,
              amount: error.message,
            }));
            break;
          case "distance":
            setErrors((prevErrors) => ({
              ...prevErrors,
              distance: error.message,
            }));
            break;
        }
      });
    };

    createItem({ ...values }, onSuccessCreate, onErrorCreate);
  };

  return (
    <>
      <div className="create_btn_container">
        <Button title="Create item" onClick={() => setModalVisible(true)} />
      </div>
      <Modal isOpen={modalVisible} handleClose={handleClose}>
        <h1>Create item</h1>
        <form id="create">
          <TextInput
            placeholder="Name"
            value={values.name}
            onChange={(value) =>
              setValues((prevValues) => ({ ...prevValues, name: value }))
            }
            onBlur={() => {
              if (!values.name) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  name: "Field is required",
                }));
                return;
              }
              if (values.name.length < 4) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  name: "Should be at least 4 characters long",
                }));
                return;
              }
              if (errors.name) {
                setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
              }
            }}
            error={errors.name}
          />
          <TextInput
            placeholder="Amount"
            value={values.amount}
            onChange={(value) =>
              setValues((prevValues) => ({ ...prevValues, amount: value }))
            }
            onBlur={() => {
              if (!values.amount) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  amount: "Field is required",
                }));
                return;
              }
              if (!parseInt(values.amount) || parseInt(values.amount) <= 0) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  amount: "Should be a positive number",
                }));
                return;
              }
              if (errors.amount) {
                setErrors((prevErrors) => ({ ...prevErrors, amount: "" }));
              }
            }}
            error={errors.amount}
          />
          <TextInput
            placeholder="Distance"
            value={values.distance}
            onChange={(value) =>
              setValues((prevValues) => ({ ...prevValues, distance: value }))
            }
            onBlur={() => {
              if (!values.distance) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  distance: "Field is required",
                }));
                return;
              }
              if (
                !parseInt(values.distance) ||
                parseInt(values.distance) <= 0
              ) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  distance: "Should be a positive number",
                }));
                return;
              }
              if (errors.distance) {
                setErrors((prevErrors) => ({ ...prevErrors, distance: "" }));
              }
            }}
            error={errors.distance}
          />
          <Button title="Submit" onClick={onSubmit} />
        </form>
      </Modal>
    </>
  );
};

export default CreateItemModal;
