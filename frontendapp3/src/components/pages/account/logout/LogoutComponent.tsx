import React from 'react';
import axios from 'axios';
import { AjaxConfig, AjaxHandler } from '../../../../utils/AjaxHandler';
import { ComponentProps } from '../../../../interfaces/ComponentProps';


const LogoutComponent: React.FC<ComponentProps> = ({appContent}) => {
    const handleLogout = async () => {
        try {
            
            const token = appContent?.applicationUserDataSetting.applicationUserData.authToken?.accessToken || '';
            const email = appContent?.applicationUserDataSetting.applicationUserData.userProfile?.email || '';
    
            // Ensure token is available
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }

            const logoutRequestDto = {
                email,
                token,
            };
            

            const domain = AjaxHandler.getInstance().getDomain();

            const config: AjaxConfig = {
                url: `${domain}/api/account/logout`,
                method: 'POST',
                data: logoutRequestDto,
                beforeSend: () => console.log('Sending logout request...'),
                success: () => {
                    alert('Logout successful');
                    
                    appContent?.applicationUserDataSetting.setApplicationUserData((prevData: any) => ({
                        ...prevData,
                        userProfile: {
                            id: "",
                            firstname: "",
                            lastname: "",
                            email: ""
                        },
                        sessionState: {
                            isLoggedIn: false,
                            lastLogin: "",
                        },
                        authToken: {
                            accessToken: "",
                            expiresAt: "",
                        },
                    }));
                    localStorage.removeItem('authToken');
                    appContent?.pageSetting.setActivePage('home');
                },
                error: (err) => {
                    console.error('Logout error:', err);
                    alert('Logout failed.');
                },
                complete: () => console.log('Logout request completed.'),
            };
    
            AjaxHandler.getInstance().sendRequest(config);
        } catch (error: any) {
            console.error('Error during logout:', error);
            alert(error.response?.data || error.message || 'Logout failed');
        }
    };
    

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Logout</h2>
            <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded">
                Confirm Logout
            </button>
        </div>
    );
};

export default LogoutComponent;
