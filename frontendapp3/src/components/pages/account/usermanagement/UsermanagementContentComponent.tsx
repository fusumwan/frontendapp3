import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentProps } from '../../../../interfaces/ComponentProps';


const UsermanagementContentComponent: React.FC<ComponentProps> = ({appContent}) => {
    return (
        <div>
            {/* Usermanagement page specific content here */}
            <p>User Management Content</p>
        </div>
    );
};

export default UsermanagementContentComponent;
