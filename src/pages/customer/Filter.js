import { Row, Col } from 'antd';
import FormInput from 'components/form/FormInput';
import FormSelectUser from 'components/form/FormSelectUser';

const CustomerFilter = () => (
  <Row gutter={16}>
    <Col xl={6} lg={6} md={6} xs={24}>
        <FormInput
        name={'phone'}
        placeholder="Số điện thoại"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
        <FormInput
        name={'email'}
        placeholder="Email"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormSelectUser
        required={false}
        name="saleId"
        label="Sale"
        placeholder="Sale"
        valueProp="id"
        titleProp="fullName"
      />
    </Col>
  </Row>
)

export default CustomerFilter;