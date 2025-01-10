export interface ApplicationUserData {
    logoName: string;
    userProfile: {
        id: string;
        firstname: string;
        lastname:string;
        email: string;
    };
    sessionState: {
        isLoggedIn: boolean;
        lastLogin: string;
    };
    userRoles: string[];
    userPermissions: {
        canEdit: boolean;
        canDelete: boolean;
    };
    authToken: {
        accessToken: string;
        expiresAt: string;
    };
    pageSettings: {
        theme: string;
        language: string;
    };
    userBehavior: {
        clickEvents: string[];
        navigationHistory: string[];
    };
    selectedMenu: any;
}