import React from 'react';
import { authRoles } from 'auth';

const CustomerRetail = React.lazy(() => import('pages/customer'));
const CustomerProfile = React.lazy(() => import('pages/customer/CustomerProfile'));

export const CustomerConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/sale/m-customer', element: <CustomerRetail /> },
        { path     : '/customer/:id', element: <CustomerProfile /> },
    ]
};