import React, { useState } from "react";
import Modal from "../../../shared/Modal";
import Input from "../../../shared/Input";
import Button from "../../../shared/Button";
import Datepicker from "../../../shared/Datepicker";
import Dropdownlist from "../../../shared/Dropdownlist";

interface DataSourceColumn {
  title: string;
  field: string;
  sorter?: "string" | "number";
  value?: string;
  mode: {
    [key: string]: {
      visible: boolean;
      required?: boolean;
      type?: {
        component: string;
        type: string;
        dataSource?: any[];
        dataTextField?: string;
        dataTextValue?: string;
        pattern?: string;
        value?: string;
      };
    };
  };
}

interface EditModalComponentProps<T> {
  record: T;
  onCancel: () => void;
  onSave: (updatedRecord: T) => void;
  datasource_columns?: DataSourceColumn[];
  mode?: string; // "update" or "create"
}

const EditModalComponent = <T extends Record<string, any>>({
  record,
  onCancel,
  onSave,
  datasource_columns = [],
  mode = "update",
}: EditModalComponentProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...record });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFieldValue = (field: string): string => {
    return (formData[field] || "").toString();
  };

  const handleSave = () => {
    const missingFields = datasource_columns
      .filter((col) => col.mode[mode]?.required && !getFieldValue(col.field))
      .map((col) => col.title);

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the following required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    onSave(formData);
    onCancel();
  };

  const renderComponent = (column: DataSourceColumn) => {
    const field = column.field;
    const title = column.title;
    const componentType = column.mode[mode]?.type?.component;

    switch (componentType) {
      case "Input":
        return (
          <Input
            key={field}
            label={title}
            name={field}
            value={getFieldValue(field)}
            onChange={(e) => handleChange(field, e.target.value)}
            type={column.mode[mode]?.type?.type || "text"}
          />
        );

      case "Dropdownlist":
        return (
          <Dropdownlist
            key={field}
            label={title}
            name={field}
            onChange={(e) => handleChange(field, e.target.value)}
            dataSource={column.mode[mode]?.type?.dataSource || []}
            dataTextField={column.mode[mode]?.type?.dataTextField || ""}
            dataTextValue={column.mode[mode]?.type?.dataTextValue || ""}
            selectedValue={getFieldValue(field)}
          />
        );

      case "Datepicker":
        return (
          <Datepicker
            key={field}
            label={title}
            name={field}
            value={getFieldValue(field)}
            onChange={(e) => handleChange(field, e.target.value)}
            pattern={column.mode[mode]?.type?.pattern || "YYYY-MM-DD"}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal title="Form" isOpen={true} onClose={onCancel}>
      <div>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {datasource_columns
          .filter((col) => col.mode[mode]?.visible)
          .map((column) => renderComponent(column))}
        <div className="flex gap-4 mt-4">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModalComponent;
