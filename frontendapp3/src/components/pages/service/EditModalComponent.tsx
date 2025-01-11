import React, { useState } from "react";
import Modal from "../../shared/Modal";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { TranslationRecord } from "../../../interfaces/ComponentProps/TranslationRecord";


interface EditModalComponentProps {
  record: TranslationRecord;
  onClose: () => void;
  onSave: (updatedRecord: TranslationRecord) => void;
}

const EditModalComponent: React.FC<EditModalComponentProps> = ({
  record,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<TranslationRecord>({ ...record });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { day, original_text, from_lang, translated_text, to_lang } = formData;
    if (!day || !original_text || !from_lang || !translated_text || !to_lang) {
      setErrorMessage("All fields are required. Please fill in the missing information.");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      title="Edit Translation Record"
      isOpen={true}
      onClose={onClose}
    >
      <div>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <Input
          label="Day (UTC)"
          name="day"
          value={formData.day}
          onChange={handleChange}
          placeholder="Enter day in UTC format"
        />
        <Input
          label="Original Text"
          name="original_text"
          value={formData.original_text}
          onChange={handleChange}
          placeholder="Enter the original text"
        />
        <Input
          label="Source Language (from_lang)"
          name="from_lang"
          value={formData.from_lang}
          onChange={handleChange}
          placeholder="Enter source language code"
        />
        <Input
          label="Translated Text"
          name="translated_text"
          value={formData.translated_text}
          onChange={handleChange}
          placeholder="Enter the translated text"
        />
        <Input
          label="Target Language (to_lang)"
          name="to_lang"
          value={formData.to_lang}
          onChange={handleChange}
          placeholder="Enter target language code"
        />
        <div className="flex gap-4 mt-4">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModalComponent;
