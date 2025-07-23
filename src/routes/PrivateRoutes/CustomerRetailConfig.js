import React from 'react';
import { authRoles } from 'auth';

const ListCustomerRetail = React.lazy(() => import('pages/customer'));
const CustomerProfile = React.lazy(() => import('pages/customer/CustomerProfile'));

export const ListCustomerRetailConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/sale/m-customer', element: <ListCustomerRetail /> },
        { path     : '/customer/:id', element: <CustomerProfile /> },
    ]
};