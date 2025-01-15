import React, { useState } from "react";
import Modal from "../../../shared/Modal";
import Input from "../../../shared/Input";
import Button from "../../../shared/Button";
import Datepicker from "../../../shared/Datepicker";
import { TranslationRecord } from "../../../../interfaces/ComponentProps/TranslationRecord";

interface EditModalComponentProps {
  record: TranslationRecord;
  onCancel: () => void;
  onSave: (updatedRecord: TranslationRecord) => void;
}

const EditModalComponent: React.FC<EditModalComponentProps> = ({
  record,
  onCancel,
  onSave,
}) => {
  const [formData, setFormData] = useState<TranslationRecord>({ ...record });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const {
      originalText,
      fromLanguage,
      translatedText,
      toLanguage,
      dayUtc,
    } = formData;

    if (!originalText || !fromLanguage || !translatedText || !toLanguage || !dayUtc) {
      setErrorMessage("All fields are required. Please fill in the missing information.");
      return;
    }
    onSave(formData);
    onCancel();
  };

  return (
    <Modal
      title="Edit Translation Record"
      isOpen={true}
      onClose={onCancel}
    >
      <div>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        
        <Input
          label=""
          name="id"
          value={formData.id}
          onChange={handleChange}
          type="hidden"
        />

        <Input
          label="Original Text"
          name="originalText"
          value={formData.originalText}
          onChange={handleChange}
          placeholder="Enter the original text"
          
        />
        <Input
          label="Source Language"
          name="fromLanguage"
          value={formData.fromLanguage}
          onChange={handleChange}
          placeholder="Enter source language code"
        />
        <Input
          label="Translated Text"
          name="translatedText"
          value={formData.translatedText}
          onChange={handleChange}
          placeholder="Enter the translated text"
        />
        <Input
          label="Target Language"
          name="toLanguage"
          value={formData.toLanguage}
          onChange={handleChange}
          placeholder="Enter target language code"
        />
        <Datepicker
          label="Day (UTC)"
          name="dayUtc"
          value={formData.dayUtc}
          onChange={handleChange}
          pattern="YYYY-MM-DD"
        />
        <Datepicker
          label="Created At (UTC)"
          name="createdAtUtc"
          value={formData.createdAtUtc || ""}
          onChange={handleChange}
          pattern="YYYY-MM-DDTHH:mm:ss"
        />
        <Input
          label=""
          name="createdByUserId"
          value={formData.createdByUserId || ""}
          onChange={handleChange}
          placeholder="Enter creator user ID (optional)"
          type="hidden"
        />
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
