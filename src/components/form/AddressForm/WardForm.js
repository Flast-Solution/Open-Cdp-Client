/**************************************************************************/
/*  WardForm.js                                                           */
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

import useGetOneQuery from 'hooks/useGetOneQuery';
import { Col } from 'antd';
import FormSelect from 'components/form/FormSelect';
import { useEffect } from 'react';

const WardForm = ({ districtId }) => {

	const { refetch, record: resourceData } = useGetOneQuery({
		uri: districtId ? ('province/list?parentId=' + districtId) : null
	});

	useEffect(() => {
		refetch();
		/* eslint-disable-next-line */
	}, [districtId]);

	return (
		<Col md={8} xs={24}>
			<FormSelect
				required
				name="wardId"
				label="Phường/Xã"
				placeholder="Chọn Phường/Xã"
				resourceData={resourceData || []}
				valueProp="id"
				titleProp="name"
			/>
		</Col>
	)
}

export default WardForm;