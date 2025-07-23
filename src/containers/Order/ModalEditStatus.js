import FormListAddition from "components/form/FormListAddtion";
import { Col, Form } from 'antd';
import FormInput from "components/form/FormInput";
import FormSelect from "components/form/FormSelect";
import { FormListStyles } from "css/global";
import { useEffect } from "react";

const ModalEditStatus = ({ listStatus, onSave }) => {
  
  const [ form ] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(listStatus);
  }, [form, listStatus]);

  return (
    <Form form={form} >
      <FormListAddition
        name="listProperties"
        textAddNew="Thêm mới thuộc tính"
      >
        <OrderStatusList />
      </FormListAddition>
    </Form>
  )
}

const OrderStatusList = ({ field }) => {
  const { name } = field || { name: 0 };
  return <>
    <FormListStyles gutter={16}>
      <Col md={8} xs={24}>
        <FormInput 
          name={[name, 'name']} 
        />
      </Col>
      <Col md={8} xs={24}>
        <FormSelect
          resourceData={[{id: 0, name: "Kích hoạt"}, {id: 1, name: "Ngưng"}]} 
          name={[name, 'status']} 
        />
      </Col>
      <Col md={8} xs={24}>

      </Col>
    </FormListStyles>
  </>
}

export default ModalEditStatus;