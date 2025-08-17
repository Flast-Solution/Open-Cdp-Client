/**************************************************************************/
/*  index.js                                                           		*/
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

import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import useGetList from "hooks/useGetList";
import { HASH_MODAL } from 'configs';
import { InAppEvent } from 'utils/FuseUtils';
import { cloneDeep } from 'lodash';
import { dateFormatOnSubmit, formatMoney, formatTime } from 'utils/dataUtils';
import { renderArrayColor } from 'containers/Order/utils';
import Filter from './Filter';
import OrderService from 'services/OrderService';
import { useEffectAsync } from 'hooks/MyHooks';

const CoHoi7DayPage = ( { type }) => {

  const [ title, setTitle ] = useState("");
  useEffectAsync(() => setTitle(type === 'cohoi' 
    ? 'Danh sách Cơ hội 7 ngày chưa ra đơn hàng' 
    : 'Đơn hàng chưa chăm sóc sau bán'
  ), [type]);

  const onEdit = (item) => {
    let title = 'Cập nhật mã Cơ hội / Đơn hàng #' + item.code
    let hash = '#draw/cohoi7Day.edit';
    let data = cloneDeep(item);
    InAppEvent.emit(HASH_MODAL, { hash, title, data });
  }

  const CUSTOM_ACTION = [
    {
      title: 'Kinh doanh',
      dataIndex: 'userCreateUsername',
      key: 'userCreateUsername',
      width: 120,
      ellipsis: true
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      width: 150,
      ellipsis: true,
      render: (products, record) => renderArrayColor(products, record.detailstatus)
    },
    {
      title: 'T.G Chốt',
      dataIndex: 'opportunityAt',
      key: 'opportunityAt',
      width: 120,
      ellipsis: true,
      render: (time) => formatTime(time)
    },
    {
      title: 'Họ tên',
      dataIndex: 'customerReceiverName',
      key: 'customerReceiverName',
      width: 130,
      ellipsis: true
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerMobilePhone',
      key: 'customerMobilePhone',
      width: 130,
      ellipsis: true
    },
    {
      title: 'Tỉnh/T.P',
      dataIndex: 'customerAddress',
      key: 'customerAddress',
      width: 120,
      ellipsis: true,
      render: (address) => address || '(Chưa có)'
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      ellipsis: true,
      render: (time) => formatTime(time)
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      width: 130,
      ellipsis: true,
      render: (total) => formatMoney(total)
    },
    {
      title: 'Giảm giá',
      dataIndex: 'priceOff',
      key: 'priceOff',
      width: 130,
      ellipsis: true,
      render: (priceOff) => formatMoney(priceOff)
    },
    {
      title: 'Phí ship',
      dataIndex: 'shippingCost',
      key: 'shippingCost',
      width: 130,
      ellipsis: true,
      render: (shippingCost) => formatMoney(shippingCost)
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paid',
      key: 'paid',
      width: 130,
      ellipsis: true,
      render: (paid) => formatMoney(paid)
    },
    {
      title: 'Còn lại',
      key: 'remainingAmount',
      width: 130,
      ellipsis: true,
      render: (record) => formatMoney(record.total - record.paid)
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => onEdit(record)}
        >
          Cập nhật
        </Button>
      )
    }
  ];

  const beforeSubmitFilter = useCallback((values) => {
    dateFormatOnSubmit(values, ['from', 'to']);
    return values;
  }, []);

  const onData = useCallback(async (response) => {
    return OrderService.viewInTable(response);
  }, []);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <CustomBreadcrumb
        data={[{ title: 'Trang chủ' }, { title: title }]}
      />
      <RestList
        xScroll={1200}
        onData={onData}
        initialFilter={{ limit: 10, page: 1, type }}
        filter={<Filter />}
        beforeSubmitFilter={beforeSubmitFilter}
        useGetAllQuery={useGetList}
        hasCreate={false}
        apiPath={'cs/co-hoi-order-fetch'}
        columns={CUSTOM_ACTION}
      />
    </div>
  )
}

export default CoHoi7DayPage
