import React from 'react';
import IncludeComponent from '../../layout/include/IncludeComponent';
import HomeContentComponent from './HomeContentComponent';
import { ComponentProps } from '../../../interfaces/ComponentProps';


const HomeComponent: React.FC<ComponentProps> = ({appContent}) => {
    return (
        <div className="flex flex-col flex-grow">
            <IncludeComponent />
            <div className="flex-grow flex items-center justify-center bg-white p-4">
                <HomeContentComponent appContent={appContent}/>
            </div>
        </div>
    );
};

export default HomeComponent;
