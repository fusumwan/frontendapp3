// src/interfaces/appContent.ts

export interface AppContent {
    pageSetting: {
        setActivePage: (page: string) => void;
        activePage: string;
    };
    applicationUserDataSetting: {
        setApplicationUserData: (data: any) => void;
        applicationUserData: any;
    };
}
