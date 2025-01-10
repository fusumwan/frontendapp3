import React from 'react';

const LoadingOverlay: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
            <img
                src={process.env.PUBLIC_URL+'/assets/images/icons8-loading2.gif'}
                alt="Loading..."
                className="w-16 h-16"
            />
        </div>
    );
};

export default LoadingOverlay;
