/**************************************************************************/
/* pages.material.index.js                                                */
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
import { Button, Space, Popconfirm, Form, message } from 'antd';
import { Helmet } from 'react-helmet';
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import RestList from 'components/RestLayout/RestList';
import Filter from './Filter';
import useGetList from "hooks/useGetList";
import { dateFormatOnSubmit, formatMoney, formatTime, f5List } from 'utils/dataUtils';
import { HASH_POPUP } from 'configs/constant';
import { InAppEvent } from 'utils/FuseUtils';
import { DeleteOutlined } from '@ant-design/icons';
import FormInfiniteStock from 'components/form/SelectInfinite/FormInfiniteStock';
import FormInputNumber from 'components/form/FormInputNumber';
import RequestUtils from 'utils/RequestUtils';

const PopconfirmImport = ({ form }) => {
  return (
    <Form form={form} layout='vertical' style={{ width: 300, margin: '30px 30px 0px 0px' }}>
			<FormInfiniteStock
				required
				placeholder="Chọn kho"
				label="Kho cần chuyển đến"
				name="warehouseId"
			/>
			<FormInputNumber
				style={{ width: '100%' }}
				name="quantity"
				label="Số lượng"
				placeholder="Nhập số lượng"
				required
				min={1}
				initialValue={1}
			/>
		</Form>
  )
};

const MaterialPage = () => {

	const [ title ] = useState("Vật liệu - Nguyên vật liệu");
	const [ form ] = Form.useForm();

	const onClickViewDetail = (material) => {
		const onAfterSubmit = (values) => {
			f5List("material/fetch");
		};
		InAppEvent.emit(HASH_POPUP, {
			hash: "material.add",
			title: "Cập nhật vật liệu #" + (material.name || ''),
			data: { onSave: onAfterSubmit, material }
		});
	};

	const onConfirmImport = async (record) => {
		try {
			const values = await form.validateFields();
			const body = { ...values, materialId: record.id };
			const { message: MSG } = await RequestUtils.Post('/material/import', body);
			message.success(MSG);
		} catch (error) {
			console.error('Error during import:', error);
			message.error('Failed to import material. Please try again.');
		}
	};

  const CUSTOM_ACTION = [
		{
			title: 'Tên',
			dataIndex: 'name',
			ellipsis: true,
			width: 200
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			ellipsis: true,
			width: 250
		},
		{
			title: 'Đơn vị tính',
			dataIndex: 'unitType',
			ellipsis: true,
			width: 120
		},
		{
			title: 'Đơn vị quy đổi',
			dataIndex: 'unit',
			ellipsis: true,
			width: 120
		},
		{
			title: 'Giá',
			dataIndex: 'pricePerUnit',
			ellipsis: true,
			width: 120,
			render: (pricePerUnit) => formatMoney(pricePerUnit)
		},
		{
			title: 'Tồn kho',
			dataIndex: 'inventory',
			ellipsis: true,
			width: 120,
			render: (inventory) => inventory?.quantity || 0
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			ellipsis: true,
			width: 120,
			render: (createdAt) => formatTime(createdAt)
		},
		{
			title: 'Action',
			fixed: 'right',
			width: 160,
			render: (record) => (
				<Space gap={8}>
					<Button
						type="primary"
						size="small"
						onClick={() => onClickViewDetail(record)}
					>
						Sửa
					</Button>
					<Popconfirm
						placement="topLeft"
						title="Chọn kho để nhập"
						description={<PopconfirmImport form={form} />}
						onConfirm={() => onConfirmImport(record)}
						okText="Có"
						cancelText="Không"
					>
						<Button size="small" style={{ color: "#fa8c16" }}>
							Nhập kho
						</Button>
					</Popconfirm>
					<Popconfirm
						title="Xóa vật liệu"
						description="Bạn có chắc chắn muốn xóa vật liệu này không?"
						okText="Có"
						cancelText="Không"
					>
						<Button icon={<DeleteOutlined />} size='small' />
					</Popconfirm>
				</Space>
			)
		}
  ];

  const beforeSubmitFilter = useCallback((values) => {
		dateFormatOnSubmit(values, ['from', 'to']);
		return values;
  }, []);

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
				filter={<Filter />}
				beforeSubmitFilter={beforeSubmitFilter}
				useGetAllQuery={useGetList}
				hasCreate={true}
				customClickCreate={() => onClickViewDetail({})}
				apiPath={'material/fetch'}
				columns={CUSTOM_ACTION}
			/>
		</div>
  )
};

export default MaterialPage;
