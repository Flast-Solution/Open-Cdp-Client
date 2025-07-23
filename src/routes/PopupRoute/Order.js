import React from 'react';
const ChoiseSKU = [
  {
    path: 'sku.add',
    Component: React.lazy(() => import('containers/Order/ModalAddSKU')),
    modalOptions: { title: '', width: 750 }
  },
  {
    path: 'order.add.status',
    Component: React.lazy(() => import('containers/Order/ModalEditStatus')),
    modalOptions: { title: '', width: 750 }
  }
];

export default ChoiseSKU;