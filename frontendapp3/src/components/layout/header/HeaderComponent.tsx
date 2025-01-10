import React, { lazy, Suspense } from 'react';
import HeaderContentCompoent from './HeaderContentCompoent';
import { ComponentProps } from '../../../interfaces/ComponentProps';

const HeaderComponent: React.FC<ComponentProps> = ({appContent}) => {
    // Lazy load the component using absolute_path if available
    const Component = appContent?.applicationUserDataSetting.applicationUserData.selectedMenu.absolute_path
        ////If you must use dynamic paths, configure Webpack to handle them. However, this is less modular and can lead to performance issues:
        ? lazy(() => import(/* webpackInclude: /\.tsx$/ */ `../../../${appContent?.applicationUserDataSetting.applicationUserData.selectedMenu.absolute_path}`))
        : null;
    
    return (
        <header className="bg-gray-800 text-white">
            <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
                {Component ? (
                    <Component
                        appContent={appContent}
                    />
                ) : (
                    <HeaderContentCompoent />
                )}
            </Suspense>
        </header>
    );
};

export default HeaderComponent;
