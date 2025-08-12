import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button  } from 'antd';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import ShipFilter from './Filter';
import useGetList from "hooks/useGetList";
import { dateFormatOnSubmit, formatTime } from 'utils/dataUtils';
import { InAppEvent } from 'utils/FuseUtils';
import { ShowSkuDetail } from 'containers/Product/SkuView';
import { HASH_MODAL } from 'configs/constant';

const ShipPage = () => {

  const [ title ] = useState("Đã giao");
  const beforeSubmitFilter = useCallback((values) => {
    dateFormatOnSubmit(values, ['from', 'to']);
    return values;
  }, []);

  const onClickGiaoHang = (record) =>  InAppEvent.emit(HASH_MODAL, {
    hash: "#ship.update",
    title: 'Phiếu xuất kho #' + record.orderCode,
    data: record
  });

  const CUSTOM_ACTION = [
    {
      title: 'Mã S.Phẩm',
      dataIndex: 'warehouseProduct',
      width: 120,
      ellipsis: true,
      render: (warehouse) => warehouse.product.code
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'warehouseProduct',
      width: 150,
      ellipsis: true,
      render: (warehouse) => warehouse.product.name
    },
    {
      title: 'Mã đơn',
      dataIndex: 'orderCode',
      width: 120,
      ellipsis: true
    },
    {
      title: 'Nhân viên',
      dataIndex: 'ssoId',
      width: 120,
      ellipsis: true
    },
    {
      title: 'Người nhận',
      dataIndex: 'receiverName',
      width: 150,
      ellipsis: true
    },
    {
      title: 'SĐT',
      dataIndex: 'receiverMobile',
      width: 120,
      ellipsis: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 150,
      ellipsis: true
    },
    {
      title: 'SKUS',
      dataIndex: 'warehouseProduct',
      width: 200,
      ellipsis: true,
      render: (warehouse) => <ShowSkuDetail skuInfo={warehouse.skuDetails} width={250} />
    },
    {
      title: 'Kho',
      dataIndex: 'warehouseProduct',
      width: 150,
      render: (warehouse) => warehouse.stockName,
      ellipsis: true
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 80,
      ellipsis: true
    },
    {
      title: 'Thời gian',
      dataIndex: 'inTime',
      width: 120,
      ellipsis: true,
      render: (inTime) => formatTime(inTime)
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
          onClick={() => onClickGiaoHang(record)}
        >
          Cập nhật
        </Button>
      )
    }
  ];

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <CustomBreadcrumb
        data={[{ title: 'Trang chủ' }, { title: title }]}
      />
      <RestList
        hasCreate={false}
        xScroll={1400}
        initialFilter={{ limit: 10, page: 1 }}
        filter={<ShipFilter />}
        beforeSubmitFilter={beforeSubmitFilter}
        useGetAllQuery={useGetList}
        apiPath={'shipping/fetch'}
        columns={CUSTOM_ACTION}
      />
    </div>
  )
};

export default ShipPage;
