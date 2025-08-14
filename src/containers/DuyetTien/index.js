/**************************************************************************/
/*  index.js                                                          		*/
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

import React from 'react';
import { Table } from 'antd';
import { formatMoney, formatTime } from 'utils/dataUtils';

const DuyetTienPage = ({ closeModal, title, data }) => {
    const CUSTOM_ACTION = [
        {
            title: "Code",
            dataIndex: 'code',
        },
        {
            title: "Thời gian",
            ataIndex: 'confirmTime',
            ellipsis: true,
            render: (item) => {
                return (
                    <div>
                        {formatTime(item.confirmTime)}
                    </div>
                )
            }
        },
        {
            title: "Nội dung",
            ataIndex: 'content',
            ellipsis: true,
            render: (item) => {
                return (
                    <div>
                        {item?.content}
                    </div>
                )
            }
        },
        {
            title: "Trạng thái",
            ataIndex: 'isConfirm',
            ellipsis: true,
            render: (item) => {
                return (
                    <div>
                        {item?.isConfirm}
                    </div>
                )
            }
        },
        {
            title: "Phương thức",
            ataIndex: 'method',
            ellipsis: true,
            render: (item) => {
                return (
                    <div>
                        {item?.method}
                    </div>
                )
            }
        },
        {
            title: "Tổng tiền",
            ataIndex: 'amount',
            ellipsis: true,
            render: (item) => {
                return (
                    <div>
                        {formatMoney(item?.amount)}
                    </div>
                )
            }
        },
    ];

    return <>
        <div>
            <p>
                <strong>Danh sách chi tiết thanh toán</strong>
            </p>
            <div class="group-inan" style={{ background: '#f4f4f4', borderTop: '1px dashed red', marginBottom: 20 }}></div>
            <Table dataSource={data} pagination={false} scroll={{ x: 1700 }} columns={CUSTOM_ACTION} />
        </div>
    </>
}

export default DuyetTienPage;