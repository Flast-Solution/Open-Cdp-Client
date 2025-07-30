import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import WarehouseFilter from './Filter';
import useGetList from "hooks/useGetList";
import { dateFormatOnSubmit, formatTime } from 'utils/dataUtils';
import { InAppEvent } from 'utils/FuseUtils';
import { ShowSkuDetail } from 'containers/Product/SkuView';
import { HASH_POPUP } from 'configs/constant';

const ListInStocK = () => {

  const [ title ] = useState("Trong kho");
  const beforeSubmitFilter = useCallback((values) => {
    dateFormatOnSubmit(values, ['from', 'to']);
    return values;
  }, []);

  const onCreateImportProduct = () => InAppEvent.emit(HASH_POPUP, {

  });

  const CUSTOM_ACTION = [
    {
      title: 'Mã S.Phẩm',
      dataIndex: 'product',
      width: 120,
      ellipsis: true,
      render: (product) => product.code
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      width: 150,
      ellipsis: true,
      render: (product) => product.name
    },
    {
      title: 'Nhân viên',
      dataIndex: 'userName',
      width: 120,
      ellipsis: true
    },
    {
      title: 'SKUS',
      dataIndex: 'skuDetails',
      width: 250,
      ellipsis: true,
      render: (skuDetails) => <ShowSkuDetail skuInfo={skuDetails} width={250} />
    },
    {
      title: 'Kho',
      dataIndex: 'stockName',
      width: 120,
      ellipsis: true
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      width: 80,
      ellipsis: true
    },
    {
      title: 'Đã nhập',
      dataIndex: 'total',
      width: 80,
      ellipsis: true
    },
    {
      title: 'Nhà C.Cấp',
      dataIndex: 'providerName',
      width: 120,
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
      width: 200,
      render: (record) => (
        <span style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" size="small" >
            Giao hàng
          </Button>
          <Button size="small" style={{ color: "#fa8c16" }}>
            Chuyển kho
          </Button>
        </span>
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
        xScroll={1400}
        initialFilter={{ limit: 10, page: 1 }}
        filter={<WarehouseFilter />}
        beforeSubmitFilter={beforeSubmitFilter}
        useGetAllQuery={useGetList}
        apiPath={'warehouse/fetch'}
        customClickCreate={onCreateImportProduct}
        columns={CUSTOM_ACTION}
      />
    </div>
  )
}

export default ListInStocK
