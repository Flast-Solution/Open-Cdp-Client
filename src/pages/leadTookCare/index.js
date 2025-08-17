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
import { Helmet } from 'react-helmet';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import LeadFilter from './LeadFilter';
import useGetList from "hooks/useGetList";
import { Button, Tag } from 'antd';
import { arrayEmpty, dateFormatOnSubmit } from 'utils/dataUtils';
import { InAppEvent } from 'utils/FuseUtils';
import { cloneDeep } from 'lodash';
import { HASH_MODAL } from 'configs';

const LeadTookCarePage = () => {

  const [title] = useState("Danh sách Lead đã chăm sóc");

  const onEdit = (item) => {
    let title = 'lead đã chăm sóc# ' + item.id;
    let hash = '#draw/leadTake.edit';
    let data = cloneDeep(item);
    InAppEvent.emit(HASH_MODAL, { hash, title, data });
  }

  const CUSTOM_ACTION = [
    {
      title: "Nguyên nhân",
      ataIndex: 'cause',
      width: 200,
      ellipsis: true,
      render: (item) => {
        return (
          <div>
            <Tag color="orange">{item?.cause}</Tag>
          </div>
        )
      }
    },
    {
      title: "Ngày",
      ataIndex: 'inTime',
      width: 200,
      ellipsis: true,
      render: (item) => {
        return (
          <div>
            {dateFormatOnSubmit(item?.inTime)}
          </div>
        )
      }
    },
    {
      title: "Tên sản phẩm",
      ataIndex: 'productName',
      width: 200,
      ellipsis: true,
      render: (item) => {
        return (
          <div>
            {item?.productName}
          </div>
        )
      }
    },
    {
      title: "Sale",
      ataIndex: 'sale',
      width: 200,
      ellipsis: true,
      render: (item) => {
        return (
          <div>
            {item?.sale}
          </div>
        )
      }
    },
    {
      title: "User_Note",
      ataIndex: 'userNote',
      width: 200,
      ellipsis: true,
      render: (item) => {
        return (
          <div>
            {item?.userNote}
          </div>
        )
      }
    },
    {
      title: "Thao tác",
      width: 100,
      fixed: 'right',
      render: (record) => (
        <div>
          <Button color="primary" variant="dashed" onClick={() => onEdit(record)} size='small'>
            Detail
          </Button>
        </div>
      )
    }
  ];

  const onData = useCallback((values) => {
    if (arrayEmpty(values.embedded)) {
      return values;
    }
    const data = values.embedded.map(v => {
      const newItem = { ...v?.dataCare, ...v?.data };
      return newItem;
    });
    const newData = {
      embedded: data,
      page: values?.page
    }
    return newData;
  }, []);

  const beforeSubmitFilter = useCallback((values) => {
    dateFormatOnSubmit(values, ['from', 'to']);
    return values;
  }, []);

  const onCreateLead = () => {

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
        initialFilter={{ limit: 10, page: 1, phone: '', cause: '', userId: '', from: '', to: '', }}
        filter={<LeadFilter />}
        beforeSubmitFilter={beforeSubmitFilter}
        useGetAllQuery={useGetList}
        hasCreate={false}
        apiPath={'data/taken-care'}
        customClickCreate={onCreateLead}
        columns={CUSTOM_ACTION}
      />
    </div>
  )
}

export default LeadTookCarePage
