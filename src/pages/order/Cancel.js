import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import ListOrder from 'containers/Order/List';
import { useEffectAsync } from 'hooks/MyHooks';
import RequestUtils from 'utils/RequestUtils';

const OrderCancel = () => {

  const [ title ] = useState("Danh sách đơn hủy");
  const [ filter, setFilter ] = useState({ type: "order", status: -1 });

  useEffectAsync(async() => {
    const listStatus = await RequestUtils.GetAsList("/order-status/fetch");
    const statusCancel = listStatus.find(i => i.name === "Hủy đơn")?.id ?? -1;
    setFilter(pre => ({...pre, status: statusCancel}))
  }, []);

  return <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <CustomBreadcrumb
      data={[{ title: 'Trang chủ' }, { title: title }]}
    />
    <ListOrder filter={filter} />
  </>
};

export default OrderCancel;