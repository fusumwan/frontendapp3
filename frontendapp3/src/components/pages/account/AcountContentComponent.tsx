import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentProps } from '../../../interfaces/ComponentProps';

const AcountContentComponent: React.FC<ComponentProps> = ({appContent}) => {
    return (
        <div>
            {/* Account page specific content here */}
            <p>Account Content</p>
        </div>
    );
};

export default AcountContentComponent;
