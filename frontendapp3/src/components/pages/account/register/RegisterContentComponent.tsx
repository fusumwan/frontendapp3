import React, { useState } from 'react';
import { AjaxConfig, AjaxHandler } from '../../../../utils/AjaxHandler';
import ReCAPTCHA from 'react-google-recaptcha';
import { ComponentProps } from '../../../../interfaces/ComponentProps';

const RegisterContentComponent: React.FC<ComponentProps> = ({appContent}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [tenantId, setTenantId] = useState<string | null>('');
    const [error, setError] = useState('');

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };
    const handleToLogin = async () => {
        appContent?.pageSetting.setActivePage('login');
    }
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!captchaToken) {
            setError('Please complete the CAPTCHA');
            return;
        }

        const registrationDto = {
            username,
            email,
            password,
            firstName,
            lastName,
            role,
            captchaToken,
            tenantId,
        };

        const domain = AjaxHandler.getInstance().getDomain();

        const config: AjaxConfig = {
            url: `${domain}/api/account/register`,
            method: 'POST',
            data: registrationDto,
            beforeSend: () => console.log('Sending registration request...'),
            success: () => {
                alert('Registration successful');
                setError(''); // Clear any previous errors
                appContent?.pageSetting.setActivePage('home');
            },
            error: (err) => {
                const errorMessage = err.response?.data?.title || err.response?.data || 'Registration failed';
                setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
            },
            complete: () => console.log('Registration request completed.')
        };

        AjaxHandler.getInstance().sendRequest(config);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
            <ReCAPTCHA
                sitekey="6LciQrAqAAAAAPbSWgPhNW2Fqgyay_O_4LgtaCRF" // Replace with your site key
                onChange={handleCaptchaChange}
            />
            <button
                onClick={handleRegister}
                className="w-full bg-green-500 text-white p-2 rounded mt-4"
            >
                Register
            </button>
            <div className="mt-4">
                <a href="#" onClick={handleToLogin} className="text-blue-500">
                    Already have an account? Login here.
                </a>
            </div>
        </div>
    );
};

export default RegisterContentComponent;
