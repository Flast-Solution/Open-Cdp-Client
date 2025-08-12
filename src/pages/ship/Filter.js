import { Row, Col } from 'antd';
import FormInput from 'components/form/FormInput';
import FormInfiniteShipStatus from 'components/form/SelectInfinite/FormInfiniteShipStatus';
import FormInfiniteStock from 'components/form/SelectInfinite/FormInfiniteStock';
import FormSelectInfiniteBusinessUser from 'components/form/SelectInfinite/FormSelectInfiniteBusinessUser';
import FormSelectInfiniteProduct from 'components/form/SelectInfinite/FormSelectInfiniteProduct';

const ShipFilter = () => (
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
      <FormInput
        name="orderCode"
        placeholder="Mã đơn"
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
        name="detailCode"
        placeholder="Mã con"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormInput
        name="transporterCode"
        placeholder="Mã vận đơn"
      />
    </Col>
    <Col xl={6} lg={6} md={6} xs={24}>
      <FormInfiniteShipStatus 
        placeholder="Chọn trạng thái"
      />
    </Col>
  </Row>
)

export default ShipFilter;