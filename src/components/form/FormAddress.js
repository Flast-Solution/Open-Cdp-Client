import { Form, Col } from "antd";
import FormInput from "components/form/FormInput";
import FormSelect from "components/form/FormSelect";
import FormSelectInfiniteProvince from "components/form/SelectInfinite/FormSelectInfiniteProvince";
import { useEffectAsync } from "hooks/MyHooks";
import React, { useState } from "react";
import RequestUtils from "utils/RequestUtils";

const FormAddress = () => {
  return <>
    <Col md={12} xs={24}>
      <FormSelectInfiniteProvince 
        name="provinceId"
        label="Tỉnh / TP"
        required
        placeholder="Tỉnh / TP"
        initialFilter={{id: 0}}
      />
    </Col>
    <Col md={12} xs={24}>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.provinceId !== curValues.provinceId }
      >
        {({ getFieldValue }) => (
          <FormWard
            parentId={getFieldValue('provinceId')}
          />
        )}
      </Form.Item>
    </Col>
    <Col md={24} xs={24}>
      <FormInput 
        label="Địa chỉ"
        name="address"
        required
        placeholder="Địa chỉ"
      />
    </Col>
  </>
}

const FormWard = React.memo(({ parentId }) => {

  const [ datas, setData ] = useState([]);
  useEffectAsync(async() => {
    if(!parentId) {
      return;
    }
    const wards = await RequestUtils.GetAsList("/province/find", {id: parentId});
    setData(wards);
  }, [parentId]);

  return (
    <FormSelect 
      name="wardId"
      label="Phường / Xã"
      required
      resourceData={datas}
      placeholder="Phường / Xã"
    />
  );
});

export default FormAddress;