import React from 'react';

const IncludeComponent: React.FC = () => {
    return (
        <React.Fragment>
            <link href="/assets/css/app.css" rel="stylesheet" type="text/css" media="all" />
            <link href="/assets/css/main.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/index.css" rel="stylesheet" type="text/css" media="all" />
            <script src="/assets/js/main.js"></script>
            <script src="/assets/js/index.js"></script>
        </React.Fragment>
    );
}

export default IncludeComponent;
