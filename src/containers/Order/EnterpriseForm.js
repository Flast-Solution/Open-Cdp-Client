import { Form, Row, Col, message } from "antd";
import CustomButton from "components/CustomButton";
import FormAddress from "components/form/FormAddress";
import FormHidden from "components/form/FormHidden";
import FormInput from "components/form/FormInput";
import { SUCCESS_CODE } from "configs";
import { useEffectAsync } from "hooks/MyHooks";
import { arrayNotEmpty } from "utils/dataUtils";
import RequestUtils from "utils/RequestUtils";

const EnterpriseForm = ({ customerOrder }) => {

  const [ form ] = Form.useForm();
  useEffectAsync(async () => {
    if(!customerOrder) {
      return;
    }
    const { data, errorCode } = await RequestUtils.Get("/customer/fetch-customer-enterprise", { 
      code: customerOrder.code,
      limit: 1
    });
    if(arrayNotEmpty(data?.embedded || []) && errorCode === SUCCESS_CODE) {
      let [ enterprise ] = data.embedded;
      form.setFieldsValue(enterprise);
    }
  }, [customerOrder]);

  const onSubmit = async (values) => {
    const { message: MSG } = await RequestUtils.Post("/customer/create-enterprise", values, {
      orderId: customerOrder.id
    });
    message.info(MSG);
  }

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <FormHidden name={"id"} />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            label="Mã số thuế"
            name="taxCode"
            required
            placeholder="Mã số thuế"
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            label="Tên công ty"
            name="companyName"
            required
            placeholder="Tên công ty"
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            label="Giám đốc"
            name="director"
            required
            placeholder="Giám đốc công ty"
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            label="Người liên hệ"
            name="contactName"
            required
            placeholder="Người liên hệ"
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            label="Điện thoại liên hệ"
            name="mobilePhone"
            required
            placeholder="Điện thoại liên hệ"
          />
        </Col>
        <Col md={12} xs={24}>
          <FormInput 
            label="Email"
            name="email"
            placeholder="Email"
          />
        </Col>
        {/* Address */}
        <FormAddress />
        <Col md={24} xs={24}>
          <CustomButton 
            htmlType="submit"
          />
        </Col>
      </Row>
    </Form>
  )
}

export default EnterpriseForm;