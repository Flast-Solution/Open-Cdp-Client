import React, { useState } from 'react';
import RestList from "components/RestLayout/RestList";
import useGetList from "hooks/useGetList";
import { Helmet } from "react-helmet";
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import BotDataFilter from './BotDataFilter';
import { Avatar, Button, Tag } from 'antd';
import { InAppEvent } from "utils/FuseUtils";
import { CHANNEL_SOURCE_MAP_KEYS } from 'configs/localData';
import { HASH_MODAL } from 'configs';
import { formatTime } from 'utils/dataUtils';

const BotData = () => {

  const [ title ] = useState("Bộ sưu tập dữ liệu đa kênh");

  const onEdit = (item) => InAppEvent.emit(HASH_MODAL, { 
    hash: '#draw/lead.colletion.edit', 
    title: 'Sửa dữ liệu # ' + item.id,
    data: item 
  });

  const CUSTOM_ACTION = [
    {
      title:"Người dùng",
      dataIndex:'fullName',
      width:150,
      ellipsis: true
    },
    {
      title:"Nguồn",
      dataIndex:'channel',
      width:110,
      ellipsis: true,
      render: (channel) => CHANNEL_SOURCE_MAP_KEYS[channel].name ?? '(Chưa C/N)'
    },
    {
      title:"Dịch vụ",
      dataIndex:'service',
      width:110,
      ellipsis: true
    },
    {
      title:"SĐT",
      dataIndex:'number',
      width:150,
      ellipsis: true
    },
    {
      title:"Avatar",
      dataIndex:'imageSrc',
      width:80,
      render: (imageSrc) => <Avatar src={imageSrc} />
    },
    {
      title:"Đ/C | N.Nghiệp",
      dataIndex:'address',
      width:200,
      ellipsis: true
    },
    {
      title:"Profile",
      width:170,
      render: ({ profileLink, profileId }) => (
      <a
        rel="noopener noreferrer" 
        href={profileLink} 
        target='_blank'
      >
        { profileLink ? profileId : '(Chưa có)'}
      </a>
      )
    },
    {
      title:"Ngày",
      width:100,
      ellipsis: true,
      render: ({receiveTime}) => formatTime(receiveTime)
    },
    {
      title:"",
      width:150,
      fixed:'right',
      render: (record) => (
        <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <Button onClick={() => onEdit(record)} size='small'>Edit</Button>
          <Tag color="#f50" style={{cursor: 'pointer'}}>Tạo cơ hội</Tag>
        </div>
      )
    }
  ]

  return (
    <div className="wap-group">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <CustomBreadcrumb 
        data={[ { title: 'Trang chủ' }, { title: title} ]} 
      />
      <RestList 
        initialFilter={{ limit: 10, page: 1 }}
        hasCreate={false}
        useGetAllQuery={ useGetList }
        apiPath={ 'data-collection/fetch' }
        filter={ <BotDataFilter /> }
        columns={ CUSTOM_ACTION }
      />
    </div>
  )
};

export default BotData;