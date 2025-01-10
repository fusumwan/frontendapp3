import { AppContent } from './AppContent';

export interface ComponentProps {
    onMenuClick?: (menuId: string) => void;
    /*
    Although AppContent.pageSetting.activePage matches the type of ComponentProps.activePage, 
    TypeScript requires these properties to be defined directly in ComponentProps rather than nested in appContent.
    */
    activePage?: string; 
    applicationUserData?: any;
    setApplicationUserData?: (data: any) => void; 
    appContent?: AppContent; // Add appContent prop
}