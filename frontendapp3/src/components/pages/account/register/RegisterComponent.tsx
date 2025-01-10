import React from 'react';
import IncludeComponent from '../../../layout/include/IncludeComponent';
import HeaderComponent from '../../../layout/header/HeaderComponent';
import FooterComponent from '../../../layout/footer/FooterComponent';
import RegisterContentComponent from './RegisterContentComponent';
import { ComponentProps } from '../../../../interfaces/ComponentProps';

const RegisterComponent: React.FC<ComponentProps> = ({appContent}) => {
    return (
        <div className="flex flex-col flex-grow">
            <IncludeComponent />
            <div className="flex-grow flex items-center justify-center bg-white p-4">
                <RegisterContentComponent appContent={appContent} />
            </div>
        </div>
    );
}

export default RegisterComponent;
