/**************************************************************************/
/*  pages.kpi.index.js                                                    */
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

import React, { useState, useCallback } from 'react'
import { Button, Pagination } from 'antd';
import { Helmet } from 'react-helmet';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import { InAppEvent } from 'utils/FuseUtils';
import { HASH_POPUP } from 'configs/constant';
import ListLayoutStyles from 'components/RestLayout/RestList/styles';
import { useEffectAsync } from 'hooks/MyHooks';
import RequestUtils from 'utils/RequestUtils';

const TITLE = "Thiết lập KPI";
const KpiPage = () => {

  const [ data, setKPI ] = useState({});
  const [ filter ] = useState({});

  const onClickAddKPI = useCallback(() => {
    const onAfterSubmit = (values) => {
      fetchKPI();
    };
    InAppEvent.emit(HASH_POPUP, {
      hash: "kpi.add",
      title: "Thiết lập KPI mới",
      data: { onSave: onAfterSubmit }
    });
  }, []);

  const fetchKPI = useCallback(async (params = {}) => {
    const { data } = await RequestUtils.Get("/kpi/fetch", params);
    setKPI(data);
  }, []);

  useEffectAsync( async() => {
    fetchKPI();
  }, []);

  const onChangePagination = useCallback(async (page) => {
    fetchKPI();
    /* eslint-disable-next-line */
  }, [ filter ]);

  const paginationResult = {
    current: data?.current ?? 1,
    pageSize: 10,
    total: data?.page?.totalElements ?? 0,
    showQuickJumper: false,
    showTotal: (total, range) => `${range[0]}-${range[1]}/${total}`
  };

  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <CustomBreadcrumb
        data={[{ title: 'Trang chủ' }, { title: TITLE }]}
      />
      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 20 }}>
        <Button type="primary" onClick={onClickAddKPI}>Thêm mới KPI</Button>
      </div>
      <ListLayoutStyles>
        <div className="list-layout__pagination-bottom">
          <Pagination {...paginationResult} onChange={onChangePagination} />
        </div>
      </ListLayoutStyles>
    </div>
  )
}

export default KpiPage
