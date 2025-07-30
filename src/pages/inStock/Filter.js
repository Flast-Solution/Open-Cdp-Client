import { Row, Col } from 'antd';
import FormInput from 'components/form/FormInput';
import FormInfiniteStock from 'components/form/SelectInfinite/FormInfiniteStock';
import FormSelectInfiniteBusinessUser from 'components/form/SelectInfinite/FormSelectInfiniteBusinessUser';
import FormSelectInfiniteProduct from 'components/form/SelectInfinite/FormSelectInfiniteProduct';
import FormSelectInfiniteProvider from 'components/form/SelectInfinite/FormSelectInfiniteProvider';

const WarehouseFilter = () => (
  <Row gutter={16}>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormSelectInfiniteProduct
        placeholder="Sản phẩm"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormInfiniteStock
        placeholder="Kho"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormSelectInfiniteProvider
        placeholder="Nhà cung cấp"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormSelectInfiniteBusinessUser
        name="userId"
        placeholder="Nhân viên"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormInput
        name="sku"
        placeholder="Tên Sku"
      />
    </Col>
  </Row>
)

export default WarehouseFilter;