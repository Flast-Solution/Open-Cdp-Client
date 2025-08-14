import React from 'react';
import { authRoles } from 'auth';

const ShipPage = React.lazy(() => import('pages/ship'));
export const ShipConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/ship', element: <ShipPage /> }
    ]
};
