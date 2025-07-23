import FormListAddition from "components/form/FormListAddtion";
import { Col, Form, ColorPicker, message } from 'antd';
import FormInput from "components/form/FormInput";
import FormSelect from "components/form/FormSelect";
import { FormListStyles } from "css/global";
import { useEffect } from "react";
import RequestUtils from "utils/RequestUtils";
import { SUCCESS_CODE } from "configs";
import FormHidden from "components/form/FormHidden";
import CustomButton from "components/CustomButton";
import FormInputNumber from "components/form/FormInputNumber";

const ModalEditStatus = ({ listStatus, onSave }) => {

  const [ form ] = Form.useForm();
  useEffect(() => {
    console.log(listStatus)
    form.setFieldsValue({ lists: listStatus });
  }, [form, listStatus]);

  const onSubmit = async (values) => {
    const { lists } = values;
    const { data, errorCode, message: EMS } = await RequestUtils.Post("/order-status/save", lists);
    if(errorCode === SUCCESS_CODE) {
      onSave(data);
    }
    message.info(EMS);
  }

  return (
    <Form form={form} onFinish={onSubmit} >
      <FormListAddition
        required
        name="lists"
        textAddNew="Thêm trạng thái mới"
      >
        <OrderStatusList />
      </FormListAddition>
      <div style={{marginTop: -50}}>
        <CustomButton htmlType="submit" />
      </div>
    </Form>
  )
}

const OrderStatusList = ({ field }) => {
  const { name } = field || { name: 0 };
  return <>
    <FormListStyles gutter={16}>
      <Col md={24} xs={24}>
        <FormHidden name={"id"} />
      </Col>
      <Col md={6} xs={24}>
        <FormInput 
          required
          placeholder="Tên"
          name={[name, 'name']} 
        />
      </Col>
      <Col md={6} xs={24}>
        <FormSelect
          required
          placeholder="Chọn trạng thái"
          resourceData={[{id: 1, name: "Kích hoạt"}, {id: 0, name: "Ngưng"}]} 
          name={[name, 'status']} 
        />
      </Col>
      <Col md={6} xs={24}>
        <FormInputNumber 
          required
          placeholder="Thứ tự"
          name={[name, 'order']} 
        />
      </Col>
      <Col md={6} xs={24}>
        <Form.Item 
          name={[name, 'color']}
          rules={[
            { required: true, message: "Vui lòng Chọn định dạng màu sắc hiển thị"}
          ]}
          getValueFromEvent={(color) => color.toHexString()}
        >
          <ColorPicker showText format="hex" />
        </Form.Item>
      </Col>
    </FormListStyles>
  </>
}

export default ModalEditStatus;