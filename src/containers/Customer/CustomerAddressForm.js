/**************************************************************************/
/*  CustomerAddressForm.js                                                */
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

import React, { useState } from "react";
import { Col, Row, Form } from "antd";
import FormInput from "components/form/FormInput";
import FormSelect from "components/form/FormSelect";
import RestEditModal from "components/RestLayout/RestEditModal";
import FormDatePicker from "components/form/FormDatePicker";
import FormListAddition from "components/form/FormListAddtion";
import { FormListStyles } from "css/global";
import CustomButton from "components/CustomButton";
import FormSelectInfiniteProvince from "components/form/SelectInfinite/FormSelectInfiniteProvince";
import { useEffectAsync } from "hooks/MyHooks";
import RequestUtils from "utils/RequestUtils";

const CustomerAddressForm = ({ data }) => {

  const { iCustomer, onSave } = data;
  const onSubmit = async (values) => {
    console.log(values);
    onSave(values);
  }

  return (
    <RestEditModal
      isMergeRecordOnSubmit={false}
      updateRecord={(values) => values}
      onSubmit={onSubmit}
      record={iCustomer}
    >
      <Row gutter={24}>
        <Col md={12} xs={24}>
          <FormInput 
            required
            label="Tên khách hàng"
            placeholder="Nhập tên khách hàng"
            name="name" 
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            required
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            name="mobile" 
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput
            label="Email"
            placeholder="Nhập email"
            name="email" 
          />
        </Col>
        <Col md={12} xs={24}>
          <FormDatePicker 
            label="Ngày sinh"
            placeholder="Ngày sinh nếu có"
            name="dateOfBirth" 
          />
        </Col>
        <Col md={24} xs={24}>
          <FormListAddition
            name="customerAddress"
            textAddNew="Thêm mới địa chỉ"
          >
            <AddressFormItem />
          </FormListAddition>
        </Col>
        <Col md={24} xs={24}>
          <CustomButton htmlType="submit" title="Cập nhật" />
        </Col>
      </Row>
    </RestEditModal>
  )
}

const AddressFormItem = ({ field }) => {
  const { name } = field || { name: 0 };
  return (
    <FormListStyles gutter={16}>
      <Col md={12} xs={24}>
        <FormSelectInfiniteProvince
          name={[name, 'provinceId']}
          label="Tỉnh / TP"
          required
          placeholder="Tỉnh / TP"
          initialFilter={{ id: 0 }}
        />
      </Col>
      <Col md={12} xs={24}>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) => prevValues.provinceId !== curValues.provinceId}
        >
          {({ getFieldValue }) => (
            <FormWard
              name={name}
              parentId={getFieldValue('provinceId')}
            />
          )}
        </Form.Item>
      </Col>
      <Col md={24} xs={24} style={{marginTop: 20}}>
        <FormInput
          label="Địa chỉ"
          name={[name, 'address']}
          required
          placeholder="Địa chỉ"
        />
      </Col>
    </FormListStyles>
  )
};

const FormWard = React.memo(({ parentId, name }) => {

  const [ datas, setData ] = useState([]);
  useEffectAsync(async () => {
    if (!parentId) {
      return;
    }
    const wards = await RequestUtils.GetAsList("/province/find", { id: parentId });
    setData(wards);
  }, [parentId]);

  return (
    <FormSelect
      name={[name, 'wardId']}
      label="Phường / Xã"
      required
      resourceData={datas}
      placeholder="Phường / Xã"
    />
  )
});

export default CustomerAddressForm;