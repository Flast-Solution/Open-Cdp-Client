/**************************************************************************/
/*  GiaoHang.js                                                           */
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

import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'antd'
import CustomButton from 'components/CustomButton';
import FormAddress from 'components/form/FormAddress';
import FormInput from 'components/form/FormInput';
import FormInputNumber from 'components/form/FormInputNumber';
import FormSelectAPI from 'components/form/FormSelectAPI';
import FormInfiniteStock from 'components/form/SelectInfinite/FormInfiniteStock';
import FormInfiniteOrderCode from 'components/form/SelectInfinite/FormInfiniteOrderCode';
import FormSelect from 'components/form/FormSelect';

const getStockId = (data) => data?.itemInStock?.stockId ?? undefined;
const GiaoHangForm = ({ title, data }) => {

  const [form] = Form.useForm();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    console.log(data);
    form.setFieldValue('stockId', getStockId(data));
  }, [data, form]);

  const onChangeGetOrderItem = (value, order) => {
    const { id, details, ...values } = order;
    const {
      customerProvinceId: provinceId,
      customerWardId: wardId,
      customerAddress: address,
      ...params
    } = values;
    setDetails(details || []);
    form.setFieldsValue({ ...params, provinceId, wardId, address });
  }

  const onFinish = async (value) => {
    console.log(value);
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col md={12} xs={24}>
          <FormInfiniteOrderCode
            required
            onChangeGetSelectedItem={onChangeGetOrderItem}
            formatText={(_, order) => `${order.code} (${order.customerMobilePhone})`}
            label="Mã đơn"
            placeholder={"Nhập mã đơn"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormSelect
            required
            formatText={(_, detail) => `${detail.code} (${detail.productName}), SL: ${detail.quantity}`}
            resourceData={details}
            label="Mã đơn con"
            valueProp='code'
            name="orderDetailCode"
            placeholder={"Nhập mã đơn nhỏ"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput
            required
            label="Họ tên"
            name="customerReceiverName"
            placeholder={"Nhập họ tên"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput
            required
            label="Số điện thoại"
            name="customerMobilePhone"
            placeholder={"Số điện thoại"}
          />
        </Col>
        <FormAddress />
        <Col md={12} xs={24}>
          <FormSelectAPI
            apiPath="transporter/fetch"
            label="Đơn vị vận chuyển"
            name="transporterId"
            placeholder={"Chọn đơn vị vận chuyển"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput
            label="Mã vận đơn"
            name="transporterCode"
            placeholder={"Mã vận đơn"}
          />
        </Col>
        <Col md={8} xs={24}>
          <FormInputNumber
            required={false}
            label="Phí vận chuyển"
            name="fee"
            placeholder={"Phí"}
          />
        </Col>
        <Col md={8} xs={24}>
          <FormInputNumber
            required={false}
            label="Tiền thu hộ"
            name="cod"
            placeholder={"Tiền COD"}
          />
        </Col>
        <Col md={8} xs={24}>
          <FormInputNumber
            mix={1}
            max={data?.itemInStock?.quantity ?? 0}
            required={false}
            label="Số lượng"
            name="quality"
            placeholder={"Số lượng"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormSelectAPI
            required
            apiPath='shipping/fetch-status'
            apiAddNewItem='shipping/created-status'
            onData={(data) => data ?? []}
            label="Trang thái"
            name="status"
            placeholder="Trạng thái"
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInfiniteStock
            required
            customValue={getStockId(data)}
            name="stockId"
            label="Kho Hàng"
            placeholder="Kho Hàng"
          />
        </Col>
        <Col md={24} xs={24}>
          <CustomButton
            htmlType="submit"
            title="Hoàn thành"
          />
        </Col>
      </Row>
    </Form>
  )
}

export default GiaoHangForm;
