import React from 'react';

const Lead3DayRouter = [
  {
    path: 'lead3day.edit',
    Component: React.lazy(() => import('containers/Lead3DayForm')),
    modalOptions: { title: '', width: 750 }
  }
];

export default Lead3DayRouter;