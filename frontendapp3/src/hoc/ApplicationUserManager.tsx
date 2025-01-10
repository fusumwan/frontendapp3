import React, { useState, useEffect } from 'react';
import menuSettings from '../utils/menuSettings.json';
import { AppContent } from '../interfaces/AppContent';
import { ApplicationUserData } from '../interfaces/ApplicationUserData';

const ApplicationUserManager = (WrappedComponent: React.ComponentType<any>) => {
    const ApplicationUserWrapper: React.FC = (props) => {
        const [applicationUserData, setApplicationUserData] = useState<ApplicationUserData | null>(null);
        const [activePage, setActivePage] = useState<string>('home'); // Default to Home page
        const [appContent, setAppContent] = useState<AppContent | undefined>(undefined);

        const menuId = process.env.REACT_APP_MENU_ID || 'sticky_header_menu_01';

        useEffect(() => {
            const selectedMenu = menuSettings.find((menu: any) => menu.id === menuId);

            if (!selectedMenu) {
                console.error(`Menu ID "${menuId}" not found in menuSettings.json.`);
                return;
            }

            const defaultApplicationUserData = {
                logoName: "MyLogo",
                userProfile: {
                    id: "",
                    firstname: "",
                    lastname: "",
                    email: "",
                },
                sessionState: {
                    isLoggedIn: false,
                    lastLogin: "",
                },
                userRoles: [],
                userPermissions: {
                    canEdit: true,
                    canDelete: false,
                },
                authToken: {
                    accessToken: "",
                    expiresAt: "",
                },
                pageSettings: {
                    theme: "dark",
                    language: "en-US",
                },
                userBehavior: {
                    clickEvents: ["menu:home", "button:submit"],
                    navigationHistory: ["/home", "/account"],
                },
                selectedMenu: selectedMenu,
            };

            setApplicationUserData(defaultApplicationUserData);
        }, [menuId]);

        useEffect(() => {
            setAppContent({
                pageSetting: {
                    setActivePage: setActivePage,
                    activePage: activePage,
                },
                applicationUserDataSetting: {
                    setApplicationUserData: setApplicationUserData,
                    applicationUserData: applicationUserData,
                },
            });
        }, [setActivePage, activePage, setApplicationUserData, applicationUserData]);

        if (!appContent?.applicationUserDataSetting?.applicationUserData) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} appContent={appContent} setAppContent={setAppContent} />;
    };

    return ApplicationUserWrapper;
};

export default ApplicationUserManager;
