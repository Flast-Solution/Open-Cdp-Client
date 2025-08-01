import React from 'react'
import { Col, Form, Row } from 'antd'
import CustomButton from 'components/CustomButton';
import FormAddress from 'components/form/FormAddress';
import FormHidden from 'components/form/FormHidden';
import FormInput from 'components/form/FormInput';
import FormInputNumber from 'components/form/FormInputNumber';
import FormSelectAPI from 'components/form/FormSelectAPI';
import FormInfiniteStock from 'components/form/SelectInfinite/FormInfiniteStock';

const GiaoHangForm = ({ title, data }) => {
  
  const onFinish = async (value) => {
    console.log(value);
  }

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Row gutter={16} style={{ marginTop: 20 }}>
        <FormHidden name={'id'} />
        <Col md={12} xs={24}>
          <FormInput
            required
            label="Họ tên"
            name="customerName"
            placeholder={"Nhập họ tên"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput
            required
            label="Số điện thoại"
            name="customerPhone"
            placeholder={"Số điện thoại"}
          />
        </Col>
        <FormAddress />

        <Col md={12} xs={24}>
          <FormInput
            required={false}
            label="Mã vận chuyển"
            name="transporterCode"
            placeholder={"Mã vận chuyển"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInputNumber
            required={false}
            label="Phí"
            name="fee"
            placeholder={"Phí"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInputNumber
            required={false}
            label="Tiền hàng"
            name="cod"
            placeholder={"Tiền hàng"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInputNumber
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
