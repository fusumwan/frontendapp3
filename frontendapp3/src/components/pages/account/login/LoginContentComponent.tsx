import React, { useState } from 'react';
import axios from 'axios';
import { AjaxConfig, AjaxHandler } from "../../../../utils/AjaxHandler";
import { ComponentProps } from '../../../../interfaces/ComponentProps';

const LoginContentComponent: React.FC<ComponentProps> = ({appContent}) => {
    const [email, setEmail] = useState('user@gmail.com');
    const [password, setPassword] = useState('1234qwer');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const loginDto = { email, password };

        try {
            const domain = AjaxHandler.getInstance().getDomain();
            const config: AjaxConfig = {
                url: domain+'/api/account/login',
                method: 'POST', // Use a valid method from the union type
                data: loginDto,
                beforeSend: () => console.log('Sending login request...'),
                success: (response: any) => {
                    const { token, user } = response;

                    // Update applicationUserData
                    
                    appContent?.applicationUserDataSetting.setApplicationUserData((prevData: any) => ({
                        ...prevData,
                        userProfile: {
                            id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                        },
                        sessionState: {
                            isLoggedIn: true,
                            lastLogin: new Date().toISOString(),
                        },
                        authToken: {
                            accessToken: token,
                            expiresAt: response.expiresAt,
                        },
                    }));
    
                    // Store token in local storage
                    localStorage.setItem('authToken', token);
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                    }
    
                    alert('Login successful');
                    setError(''); // Clear any previous errors
                    appContent?.pageSetting.setActivePage('home');
                },
                error: (err: any) => {
                  console.error('Login error:', err);
                  setError('Login failed.');
                },
                complete: () => console.log('Login request completed.'),
              };
              
          
              AjaxHandler.getInstance().sendRequest(config);

           
        } catch (err: any) {
            const errorMessage = err.response?.data?.title || err.response?.data || 'Login failed';
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="ml-2">Remember Me</label>
            </div>
            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Login
            </button>
            <div className="mt-4">
                <a href="/forgot-password" className="text-blue-500">
                    Forgot Password?
                </a>
            </div>
        </div>
    );
};

export default LoginContentComponent;
