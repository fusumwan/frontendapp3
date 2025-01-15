import React, { useState,useEffect } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import Datepicker from "./Datepicker";
import Dropdownlist from "./Dropdownlist";
import { TranslationRecord } from "../../../interfaces/ComponentProps/TranslationRecord";

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

interface FromViewProps {
  record: TranslationRecord;
  onCancel: () => void;
  onSave: (updatedRecord: TranslationRecord) => void;
  datasource_columns?: DataSourceColumn[];
  mode?: string; // Mode like "update" or "create"
}

const FromView: React.FC<FromViewProps> = ({
  record,
  onCancel,
  onSave,
  datasource_columns = [],
  mode = "update",
}) => {
  const [formData, setFormData] = useState<TranslationRecord>({ ...record });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);



  const handleChange = (
    field: string,
    value: string | number | boolean | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getFieldValue = (field: string): string  => {
    // Convert formData to JSON
    const formDataJson = JSON.parse(JSON.stringify(formData));
        
    // Retrieve the value for the given field
    return formDataJson[field] || null;
  };
  

  const handleSave = () => {
    const missingFields = datasource_columns
      .filter((col) => (col.mode[mode]?.required || false ) && !getFieldValue(col.field))
      .map((col) => col.title);

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    onSave(formData);
    onCancel();
  };

  const renderComponent = (column: DataSourceColumn) => {
    const field:string = column.field || '';
    const title:string = column.title || '';
    const componentType:string = column.mode[mode]?.type?.component || '';

    switch (componentType) {
      case "Input":
        return (
          <Input
            key={field}
            label={title}
            name={field}
            value={getFieldValue(field) || ""}
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
            selectedValue={getFieldValue(field) || ""}
          />
        );

      case "Datepicker":
        return (
          <Datepicker
            key={field}
            label={title}
            name={field}
            value={getFieldValue(field) || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            pattern={column.mode[mode]?.type?.pattern || "YYYY-MM-DD"}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title="Form"
      isOpen={true}
      onClose={onCancel}
    >
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

export default FromView;
