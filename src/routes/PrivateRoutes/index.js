import React from 'react';
import { Navigate } from 'react-router-dom';
import FuseUtils from 'utils/FuseUtils';

import { LoginConfig } from './AuthConfig';
import { HomeConfig } from './HomeConfig';
import { ProductConfig } from './ProductConfig';

/* Lead - Cơ hội - Đơn hàng */
import { LeadConfig } from './LeadConfig';
import { CustomerConfig } from './CustomerRetailConfig';
import { CohoiConfig } from './CohoiConfig';
import { OrderConfig } from './OrderConfig';

/* Kho */
import { InstockConfig } from './TrongkhoConfig';
import { WareHouseConfig } from './ListKhoConfig';
import { ShipConfig } from './ShipConfig';

/* Tài khoản */
import { ListAcountConfig } from './ListAcountConnfig';
import { ListAcountGroupConfig } from './ListUserGroupConfig';
import { ListUserSystemConfig } from './ListUserSysTemConfig';

/* CSKH */
import { Lead3DayConfig } from './Lead3DayConfig'
import { Cohoi7DayConfig } from './Cohoi7DayConfig';

/* Kế  toán */
import { DuyetTienConfig } from './DuyetTienConfig';
import { CongnoConfig } from './ConnoConfig';

/* NewFeed - Quy trình */
import { NewfeedConfig } from './NewFeedConfig';
import { DragDropConfig } from './DragDropOrderConfig';

const routeConfigs = [
    LoginConfig,
    ProductConfig,
    HomeConfig,
    LeadConfig,
    Lead3DayConfig,
    CohoiConfig,
    InstockConfig,
    WareHouseConfig,
    CustomerConfig,
    ListAcountConfig,
    ListAcountGroupConfig,
    Cohoi7DayConfig,
    DuyetTienConfig,
    ListUserSystemConfig,
    NewfeedConfig,
    ShipConfig,
    OrderConfig,
    CongnoConfig,
    DragDropConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    { element: () => <Navigate to="/error-404"/> }
];

export default routes;
