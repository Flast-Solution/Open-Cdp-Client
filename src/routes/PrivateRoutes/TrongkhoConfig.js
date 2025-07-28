import React from 'react';
import { authRoles } from 'auth';

const Instock = React.lazy(() => import('pages/inStock'));
export const InstockConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/warehouse/trong-kho', element: <Instock /> }
    ]
};