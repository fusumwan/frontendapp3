

import React, { useState, useEffect, lazy, Suspense } from 'react';
import LoadingOverlay from './hoc/LoadingOverlay';
import ApplicationUserManager from './hoc/ApplicationUserManager';
import HeaderComponent from './components/layout/header/HeaderComponent';
import FooterComponent from './components/layout/footer/FooterComponent';
import { AppContent } from './interfaces/AppContent';

interface ComponentConfig {
    child_id: string;
    component: React.LazyExoticComponent<React.ComponentType<any>> | null;
}

interface AppUserDataInterface {
    setAppContent: (data: any) => void;
    appContent: any;
}

const App: React.FC<AppUserDataInterface> = ({ appContent, setAppContent }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000); // Simulates loading
    }, []);

    const selectedMenu = appContent?.applicationUserDataSetting.applicationUserData.selectedMenu;
    const loadComponents = (): ComponentConfig[] =>
        selectedMenu.options.map((menu: any) => ({
            child_id: menu.child_id,
            component: menu.absolute_path ? lazy(() => import(`./${menu.absolute_path}`)) : null,
        }));

    const components = loadComponents();

    const renderPage = () => {
        const activeComponent = components.find(
            (comp: ComponentConfig) => comp.child_id === appContent?.pageSetting.activePage
        );
        if (activeComponent?.component) {
            const Component = activeComponent.component;

            return (
                <Suspense
                    fallback={
                        <div className="text-center p-6">
                            <LoadingOverlay isVisible={true} />
                        </div>
                    }
                >
                    <Component appContent={appContent} />
                </Suspense>
            );
        }
        return <div className="text-center p-6">Page Not Found</div>;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <LoadingOverlay isVisible={isLoading} />
            <HeaderComponent appContent={appContent} />
            <main className="flex-grow bg-gray-100">{!isLoading && renderPage()}</main>
            <FooterComponent />
        </div>
    );
};

export default ApplicationUserManager(App);
