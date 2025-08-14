import React from 'react';
import { authRoles } from 'auth';

const Lead3DayPage = React.lazy(() => import('pages/lead3Day'));
export const Lead3DayConfig = {
    auth    : authRoles.admin,
    routes  : [
        { path     : '/customer-service/lead', element: <Lead3DayPage /> }
    ]
};