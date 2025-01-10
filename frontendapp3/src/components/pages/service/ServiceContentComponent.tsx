import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentProps } from '../../../interfaces/ComponentProps';


const ServiceContentComponent: React.FC<ComponentProps> = ({appContent}) => {
    return (
        <div>
            {/* Service page specific content here */}
            <p>Service Content</p>
        </div>
    );
};

export default ServiceContentComponent;
