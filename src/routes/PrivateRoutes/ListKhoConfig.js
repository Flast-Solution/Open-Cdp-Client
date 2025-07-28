import React from 'react';
import { authRoles } from 'auth';

const WareHouse = React.lazy(() => import('pages/listKho'));
export const WareHouseConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/warehouse/danh-sach-kho', element: <WareHouse /> }
    ]
};