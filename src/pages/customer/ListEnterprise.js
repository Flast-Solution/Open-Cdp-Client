/**************************************************************************/
/*  ListEnterprise.js                                                     */
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
import { Helmet } from 'react-helmet';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import CustomerFilter from './Filter';
import useGetList from 'hooks/useGetList';
import { Button } from 'antd';
import { dateFormatOnSubmit, formatTime } from 'utils/dataUtils';
import { InAppEvent } from 'utils/FuseUtils';

const ListEnterprise = () => {

  const [ title ] = useState("Khách doanh nghiệp");
  const CUSTOM_ACTION = [
    {
      title: "Khách hàng",
      dataIndex: 'companyName',
      width: 150,
      ellipsis: true
    },
    {
      title: "G.Đốc",
      dataIndex: 'director',
      width: 150,
      ellipsis: true
    },
    {
      title: "Số điện thoại",
      dataIndex: 'mobilePhone',
      width: 150,
      ellipsis: true
    },
    {
      title: "Mã S.Thuế",
      dataIndex: 'taxCode',
      width: 150,
      ellipsis: true
    },
    {
      title: "Email",
      dataIndex: 'email',
      width: 150,
      ellipsis: true,
      render: (email) => email || '(Chưa có)'
    },
    {
      title: "Địa chỉ",
      dataIndex: 'address',
      width: 170,
      ellipsis: true
    },
    {
      title: "Đ.Hàng",
      dataIndex: 'numOfOrder',
      width: 90
    },
    {
      title: "Ngày tạo",
      dataIndex: 'inTime',
      width: 200,
      ellipsis: true,
      render: (inTime) => formatTime(inTime)
    },
    {
      title: "Thao tác",
      width: 120,
      fixed: 'right',
      ellipsis: true,
      render: (record) => (
        <Button color="primary" variant="dashed" onClick={() => onHandleEdit(record)} size='small'>
          Chi tiết
        </Button>
      )
    }
  ];

  const beforeSubmitFilter = useCallback((values) => {
    dateFormatOnSubmit(values, ['from', 'to']);
    return values;
  }, []);

  const onHandleEdit = (record) => InAppEvent.openDrawer("#enterprise.edit", {
    title: 'Sửa thông tin công ty #' + record.id,
    data: { record }
  });

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
        initialFilter={{ limit: 10, page: 1 }}
        filter={<CustomerFilter taxCode={true} />}
        beforeSubmitFilter={beforeSubmitFilter}
        useGetAllQuery={useGetList}
        hasCreate={false}
        apiPath={'customer/fetch-customer-enterprise'}
        columns={CUSTOM_ACTION}
      />
    </div>
  )
}

export default ListEnterprise
