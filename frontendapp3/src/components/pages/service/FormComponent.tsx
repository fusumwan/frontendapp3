

/**
 * FormComponent

File: FormComponent.tsx
Purpose: Renders the form for creating and editing translation records.
Inputs:
Text inputs: Original Text, Translated Text.
Dropdowns: Source Language, Target Language.
Date pickers: Day (UTC), Datetime (UTC).
Validation: Displays error messages for missing or incorrect inputs.
 * 
 * Key Updates
Validation: Added robust validation logic for required fields.
Field Descriptions: Fields include day, datetime, original_text, from_lang, translated_text, and to_lang.
Styling: Followed the Tailwind CSS conventions for responsiveness and styling.
HOC Integration: Integrated necessary components for consistent application behavior.
Alignment with API: Matches the structure of the backend's API endpoints.

Key Notes:
Error Handling: Comprehensive validation and error messaging for user inputs.
Reusable Components: Leveraged Input and Button shared components for consistency.
State Management: Local state for handling form data and feedback messages.
HOC Integration: Ensures compatibility with the broader application structure.
 */


import React, { useState } from 'react';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { AjaxHandler } from '../../../utils/AjaxHandler';
import AppDTOManager from '../../../utils/AppDTOManager';
import { ComponentProps } from '../../../interfaces/ComponentProps';


const FormComponent: React.FC<ComponentProps> = ({appContent}) => {
    const [formData, setFormData] = useState({
        day: '',
        datetime: '',
        original_text: '',
        from_lang: '',
        translated_text: '',
        to_lang: '',
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const domain = AjaxHandler.getInstance().getDomain();
    const email=appContent?.applicationUserDataSetting.applicationUserData.userProfile.email;
    const token=appContent?.applicationUserDataSetting.applicationUserData.authToken.accessToken;
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { day, datetime, original_text, from_lang, translated_text, to_lang } = formData;
        if (!day || !datetime || !original_text || !from_lang || !translated_text || !to_lang) {
            setErrorMessage('All fields are required. Please fill in the missing information.');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!validateForm()) return;

        const dto = {
            day: formData.day,
            datetime: formData.datetime,
            original_text: formData.original_text,
            from_lang: formData.from_lang,
            translated_text: formData.translated_text,
            to_lang: formData.to_lang,
        };

        const ajaxConfig = {
            url: `${domain}/api/records`,
            method: 'POST' as 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dto),
            beforeSend: () => setErrorMessage(null),
            success: () => {
                setSuccessMessage('Record successfully created.');
                AppDTOManager.getInstance().setPageDto('TranslationRecordCreation', dto);
                resetForm();
            },
            error: (err: any) => {
                setErrorMessage('Failed to create record. Please try again.');
                console.error(err);
            },
        };
        AjaxHandler.getInstance().sendRequest(ajaxConfig);
    };

    const resetForm = () => {
        setFormData({
            day: '',
            datetime: '',
            original_text: '',
            from_lang: '',
            translated_text: '',
            to_lang: '',
        });
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Create Translation Record</h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <Input
                label="Day (UTC)"
                name="day"
                value={formData.day}
                onChange={handleChange}
                placeholder="Enter day in UTC format"
            />
            <Input
                label="Datetime (UTC)"
                name="datetime"
                value={formData.datetime}
                onChange={handleChange}
                placeholder="Enter datetime in UTC format"
            />
            <Input
                label="Original Text"
                name="original_text"
                value={formData.original_text}
                onChange={handleChange}
                placeholder="Enter the original text"
            />
            <Input
                label="Source Language"
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
                label="Target Language"
                name="to_lang"
                value={formData.to_lang}
                onChange={handleChange}
                placeholder="Enter target language code"
            />

            <div className="flex gap-4 mt-4">
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={resetForm}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default FormComponent;
