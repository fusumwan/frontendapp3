import React from 'react';
import { Link } from 'react-router-dom';
import { ComponentProps } from '../../../interfaces/ComponentProps';


const HomeContentComponent: React.FC<ComponentProps>  = ({appContent}) => {
    return (
        <div>
            {/* Home page specific content here */}
            <p>Home Content</p>
        </div>
    );
};

export default HomeContentComponent;
