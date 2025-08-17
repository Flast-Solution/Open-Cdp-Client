/**************************************************************************/
/*  index.js                                                              */
/**************************************************************************/
/*                       Tệp này là một phần của:                         */
/*                             Open CDP                                   */
/*                        https://flast.vn                                */
/**************************************************************************/
/* Bản quyền (c) 2025 - này thuộc về các cộng tác viên Flast Solution     */
/* (xem AUTHORS.md).                                                      */
/* Bản quyền (c) 2024-2025 Long Huu, Quang Duc, Hung Bui                  */
/*                                                                        */
/* Bạn được quyền sử dụng phần mềm này miễn phí cho bất kỳ mục đích nào,  */
/* bao gồm sao chép, sửa đổi, phân phối, bán lại…                         */
/*                                                                        */
/* Chỉ cần giữ nguyên thông tin bản quyền và nội dung giấy phép này trong */
/* các bản sao.                                                           */
/*                                                                        */
/* Đội ngũ phát triển mong rằng phần mềm được sử dụng đúng mục đích và    */
/* có trách nghiệm                                                        */
/**************************************************************************/

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
import { LeadTookCareConfig } from './LeadTookCareConfig';
import { CohoiTakeConfig } from './CohoiTakeConfig';
import { CohoiNotTakeConfig } from './CohoiNotTakeConfig';
import { OrderTakeConfig } from './OrderTakeCareConfig';

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
    LeadTookCareConfig,
    CohoiConfig,
    InstockConfig,
    WareHouseConfig,
    CustomerConfig,
    ListAcountConfig,
    ListAcountGroupConfig,
    CohoiNotTakeConfig,
    DuyetTienConfig,
    ListUserSystemConfig,
    NewfeedConfig,
    CohoiTakeConfig,
    ShipConfig,
    OrderConfig,
    OrderTakeConfig,
    CongnoConfig,
    DragDropConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    { element: () => <Navigate to="/error-404" /> }
];

export default routes;
