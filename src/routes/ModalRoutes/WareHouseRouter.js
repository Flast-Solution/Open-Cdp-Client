import React from 'react';

const WareHoseRouter = [
  {
    path: 'warehouse.edit',
    Component: React.lazy(() => import('containers/WareHouse')),
    modalOptions: { title: '', width: 750 }
  },
  {
    path: 'warehouse.delivery',
    Component: React.lazy(() => import('containers/WareHouse/GiaoHang')),
    modalOptions: { title: '', width: 750 }
  }
];

export default WareHoseRouter;