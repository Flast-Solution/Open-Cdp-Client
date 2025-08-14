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

import RestEditModal from 'components/RestLayout/RestEditModal';
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import RequestUtils from 'utils/RequestUtils';
import { InAppEvent } from 'utils/FuseUtils';
import { f5List } from 'utils/dataUtils';
import { HASH_MODAL_CLOSE } from 'configs';

const UserAccount = ({ data, closeModal }) => {

  const [record, setRecord] = useState({});
  const [listProFile, setListProFile] = useState([]);
  const { listMember } = data;
  useEffect(() => {
    (async () => {
      const listProfile = await RequestUtils.Get('/user/list-role');
      setListProFile(listProfile?.data)
    })()
  }, [])

  const onSubmit = async (dataCreate) => {
    const params = {
      name: dataCreate?.name,
      leaderName: dataCreate?.leaderName,
      leaderId: dataCreate?.leaderId,
      type: dataCreate?.type,
      status: dataCreate?.type,
      listMember: dataCreate?.listMember
    }
    const paramsUpdate = {
      id: data?.datas?.id,
      name: dataCreate?.name || data?.datas?.name,
      memberNumber: data?.datas?.memberNumber,
      memberList: data?.datas?.memberList,
      leaderName: dataCreate?.leaderName || data?.datas?.leaderName,
      leaderId: dataCreate?.leaderId || data?.datas?.leaderId,
      type: dataCreate?.type || data?.datas?.type,
      inTime: Date.now(),
      status: dataCreate?.status || data?.datas?.status,
      listMember: dataCreate?.listMember || dataCreate?.listMember
    }
    if (data?.datas) {
      const datas = await RequestUtils.Post(`/user-group/update`, paramsUpdate);
      if (datas.errorCode === 200) {
        f5List('user-group/fetch');
        InAppEvent.emit(HASH_MODAL_CLOSE);
        InAppEvent.normalSuccess('Cập tài khoản thành công');
        return
      } else {
        InAppEvent.normalError('Cập tài khoản thất bại');
        return
      }
    } else {
      const datas = await RequestUtils.Post('/user-group/created', params);
      if (datas.errorCode === 200) {
        f5List('user-group/fetch');
        InAppEvent.emit(HASH_MODAL_CLOSE);
        InAppEvent.normalSuccess('Tạo tài khoản thành công');
        return
      } else {
        InAppEvent.normalError('Tạo tài khoản thất bại');
        return
      }
    }
  }

  return (
    <div>
      <RestEditModal
        isMergeRecordOnSubmit={false}
        updateRecord={(values) => setRecord(curvals => ({ ...curvals, ...values }))}
        onSubmit={onSubmit}
        record={record}
        closeModal={closeModal}
        formatDefaultValues={() => ({
          name: data?.datas?.name,
          leaderName: data?.datas?.leaderName,
          leaderId: data?.datas?.leaderId,
          type: data?.datas?.type,
          status: data?.datas?.status,
          memberNumber: data?.datas?.memberNumber,
          listMember: data?.datas?.listMember
        })}
      >
        <ProductForm listProFile={listProFile} data={listMember} />
      </RestEditModal>
    </div>
  )
}

export default UserAccount
