import React, { useState } from 'react';
import { Col, Form, message, Row, Table } from 'antd';
import CustomButton from 'components/CustomButton';
import FormAddress from 'components/form/FormAddress';
import FormInput from 'components/form/FormInput';
import FormInputNumber from 'components/form/FormInputNumber';
import FormSelectAPI from 'components/form/FormSelectAPI';
import FormInfiniteOrderCode from 'components/form/SelectInfinite/FormInfiniteOrderCode';
import FormSelect from 'components/form/FormSelect';
import WarehouseService from 'services/WarehouseService';
import { useEffectAsync } from 'hooks/MyHooks';
import { arrayEmpty } from 'utils/dataUtils';
import OrderTextTableOnly from 'containers/Order/OrderTextTableOnly';
import RequestUtils from 'utils/RequestUtils';

const GiaoHangForm = ({ title, data }) => {
  
  const [ form ] = Form.useForm();
  const [ submitStock, setSubmitStock ] = useState({});
  const [ details, setDetails ] = useState([]);

  const onChangeGetOrderItem = (value, order) => {
    let { id, details, ...values } = order;
    const { 
      customerProvinceId: provinceId, 
      customerWardId: wardId, 
      customerAddress: address,
      ...params
    } = values;

    form.setFieldsValue({...params, provinceId, wardId, address});
    if(arrayEmpty(details)) {
      return;
    }
    for(let detail of details) {
      detail.mSkuDetails = JSON.parse(detail.skuInfo);
    }
    setDetails(details || []);
  }

  const onFinish = async (values) => {
    if(!submitStock.id) {
      message.error("Chưa chọn kho giao !");
      return;
    }
    const { message: MSG } = await RequestUtils.Post("/warehouse/delivery", { stockId: submitStock.id, ...values})
    message.success(MSG);
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col md={12} xs={24}>
          <FormInfiniteOrderCode
            required
            onChangeGetSelectedItem={onChangeGetOrderItem}
            formatText={(_, order) => `${order.code} (${order.customerMobilePhone})` }
            label="Mã đơn"
            placeholder={"Nhập mã đơn"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormSelect
            required
            formatText={(_, detail) => `${detail.code} (${detail.productName}), SL: ${detail.quantity}` }
            resourceData={details}
            label="Mã đơn con"
            valueProp='code'
            name="orderDetailCode"
            placeholder={"Nhập mã đơn nhỏ"}
          />
        </Col>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) => prevValues.orderDetailCode !== curValues.orderDetailCode }
        >
          {({ getFieldValue }) => (
            <Col md={24} xs={24}>
              <ShowSkuInStockByDetailCode
                details={details}
                detailCode={getFieldValue('orderDetailCode')}
                onChoiseStock={setSubmitStock}
              />
            </Col>
          )}
        </Form.Item>
        <Col md={12} xs={24}>
          <FormInput
            required
            label="Người nhận"
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
            required
            apiPath="transporter/fetch"
            label="Đơn vị vận chuyển"
            name="transporterId"
            placeholder={"Chọn đơn vị vận chuyển"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput
            required
            label="Mã vận đơn"
            name="transporterCode"
            placeholder={"Mã vận đơn"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInputNumber
            required={false}
            label="Phí vận chuyển"
            name="fee"
            placeholder={"Phí"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInputNumber
            required={false}
            label="Tiền thu hộ"
            name="cod"
            placeholder={"Tiền COD"}
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInputNumber
            mix={1}
            max={data?.itemInStock?.quantity ?? 0}
            required
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

const ShowSkuInStockByDetailCode = ( { 
  details, 
  detailCode,
  onChoiseStock = (value) => value
}) => {

  const [ skusInStock, setSkuInStock ] = useState([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);

  useEffectAsync(async () => {
    onChoiseStock({});
    if(!detailCode) {
      return;
    }
    const detail = details.find(i => i.code === detailCode);
    if(!detail?.skuInfo) {
      setSkuInStock([]);
      return;
    }
    const skuHash = await WarehouseService.hashSku(detail.skuInfo);
    const { embedded } = await WarehouseService.fetch({ skuHash });
    setSkuInStock(embedded); 
  }, [details, detailCode]);

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      const [ rowSelect ] = selectedRows;
      onChoiseStock(rowSelect);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Kho', dataIndex: 'stockName' },
    { title: 'Tên SKU', dataIndex: 'skuName' },
    { title: 'Số lượng', dataIndex: 'quantity'},
    { title: 'NCC', dataIndex: 'providerName'}
  ];

  return arrayEmpty(skusInStock) ? '' : (
    <div className='item-detail'>
      <p><strong>Đơn hàng #{detailCode}</strong></p>
      <OrderTextTableOnly 
        details={details.filter(i => i.code === detailCode) || []} 
      />
      <p style={{margin: '20px 0px'}}><strong>Chọn một trong các kho</strong></p>
      <Table
        style={{marginBottom: 20}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={skusInStock}
        pagination={false}
      />
    </div>
  );
}

export default GiaoHangForm;
