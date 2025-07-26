import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import CustomerFilter from './Filter';
import useGetList from 'hooks/useGetList';
import { Button } from 'antd';
import { arrayEmpty, dateFormatOnSubmit, formatTime } from 'utils/dataUtils';
import UserService from 'services/UserService';
import { CHANNEL_SOURCE_MAP_KEYS } from 'configs/localData';
import { useNavigate } from 'react-router-dom';
import TagEditor from './TagEditor';

const ListCustomerRetail = () => {

  const [ title ] = useState("Khách lẻ");
  let navigate = useNavigate();

  const handleTagsChange = (record, newTags) => {
    console.log(newTags);
  };

  const CUSTOM_ACTION = [
    {
      title: "Tên khách hàng",
      dataIndex: 'name',
      width: 150
    },
    {
      title: "Số điện thoại",
      dataIndex: 'mobile',
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
      title: "Nguồn",
      dataIndex: 'sourceId',
      width: 170,
      render: (sourceId) => CHANNEL_SOURCE_MAP_KEYS[sourceId]?.name
    },
    {
      title: "Kinh doanh",
      dataIndex: 'saleName',
      width: 150,
      ellipsis: true
    },
    {
      title: "Đ.Hàng",
      dataIndex: 'numOfOrder',
      width: 90
    },
    {
      title: "Tags",
      dataIndex: 'tags',
      width: 250,
      render: (tags, record) => (
        <TagEditor 
          tags={tags || []} 
          onChange={(newTags) => handleTagsChange(record, newTags)}
        />
      )
    },
    {
      title: "Ngày tạo",
      dataIndex: 'createdAt',
      width: 200,
      ellipsis: true,
      render: (createdAt) => dateFormatOnSubmit(createdAt)
    },
    {
      title: "Ngày sinh",
      dataIndex: 'dateOfBirth',
      width: 120,
      ellipsis: true,
      render: (dateOfBirth) => formatTime(dateOfBirth)
    },
    {
      title: "Giới tính",
      dataIndex: 'gender',
      width: 120,
      ellipsis: true
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

  const onData = useCallback(async (values) => {
    if (arrayEmpty(values.embedded)) {
      return values;
    }
    let { embedded, page } = values;
    const ids = embedded.map( u => u.saleId);
    const mUser = await UserService.mapId2Name(ids);
    const datas = embedded.map(item => ({ ...item, saleName: mUser[item.saleId] || '' }));
    return { embedded: datas, page };
  }, []);

  const beforeSubmitFilter = useCallback((values) => {
    dateFormatOnSubmit(values, ['from', 'to']);
    return values;
  }, []);

  const onHandleEdit = ({id}) => {
    navigate(String("/customer/").concat(id));
  }

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
        initialFilter={{ limit: 10, page: 1 }}
        filter={<CustomerFilter />}
        beforeSubmitFilter={beforeSubmitFilter}
        useGetAllQuery={useGetList}
        hasCreate={false}
        apiPath={'customer/fetch-customer-personal'}
        columns={CUSTOM_ACTION}
      />
    </div>
  )
}

export default ListCustomerRetail
