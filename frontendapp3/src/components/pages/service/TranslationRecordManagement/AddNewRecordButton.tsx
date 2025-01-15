import React from 'react';
import IncludeComponent from '../../../layout/include/IncludeComponent';

/*
AddNewRecordButton

File: AddNewRecordButtonComponent.tsx
Purpose: Navigates to the Translation Record Creation Page.
Features:
Button labeled “Add New Record.”
*/


const AddNewRecordButton: React.FC= () => {
    return (
        <div className="flex flex-col flex-grow">
            <IncludeComponent />
            <div className="flex-grow flex items-center justify-center bg-white p-4">

            </div>
        </div>
    );
}

export default AddNewRecordButton;
