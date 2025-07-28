import React from 'react';
import { authRoles } from 'auth';

const WareHouseExport = React.lazy(() => import('pages/WareHouse'));
export const WareHouseExportConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/warehouse/xuat-kho', element: <WareHouseExport /> }
    ]
};