import React from 'react';
import { authRoles } from 'auth';

const OrderCancelPage = React.lazy(() => import('pages/order/Cancel'));
const OrderPage = React.lazy(() => import('pages/order'));

export const OrderConfig = {
    auth    : authRoles.user,
    routes  : [
        { path     : '/sale/order', element: <OrderPage /> },
        { path     : '/sale/order-cancel', element: <OrderCancelPage /> }
    ]
};
