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

import useGetOneQuery from 'hooks/useGetOneQuery';
import { Col, Form } from 'antd';
import DistrictForm from './DistrictForm';
import WardForm from './WardForm';
import FormSelect from 'components/form/FormSelect';
import FormInput from 'components/form/FormInput';

const AddressForm = () => {
  const { record: resourceData } = useGetOneQuery({ uri: 'province/list', filter: { parentId: '0' } });
  return <>
    <Col md={8} xs={24}>
      <FormSelect
        required
        name="provinceId"
        label="Tỉnh T/P"
        placeholder="Chọn tỉnh T/P"
        resourceData={resourceData || []}
        valueProp="id"
        titleProp="name"
      />
    </Col>
    <Form.Item noStyle
      shouldUpdate={(prevValues, curValues) =>
        prevValues.provinceId !== curValues.provinceId
      }
    >
      {({ getFieldValue }) => (
        <DistrictForm
          provinceId={getFieldValue('provinceId')}
        />
      )}
    </Form.Item>
    <Form.Item noStyle
      shouldUpdate={(prevValues, curValues) =>
        prevValues.districtId !== curValues.districtId
      }
    >
      {({ getFieldValue }) => (
        <WardForm
          districtId={getFieldValue('districtId')}
        />
      )}
    </Form.Item>
    <Col md={24} xs={24}>
      <FormInput
        maxLength={255}
        name="address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ "
        required
      />
    </Col>
  </>
}

export default AddressForm;