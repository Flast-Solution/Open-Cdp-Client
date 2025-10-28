import { useContext, useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useEffectAsync } from 'hooks/MyHooks';
import { useParams } from 'react-router-dom';
import RequestUtils from 'utils/RequestUtils';
import { Helmet } from "react-helmet";
import CustomBreadcrumb from 'components/BreadcrumbCustom';
import { GATEWAY, SUCCESS_CODE } from 'configs';
import RestEditModal from 'components/RestLayout/RestEditModal';
import FormHidden from 'components/form/FormHidden';
import { Row, Col } from 'antd';
import JoditEditor from 'jodit-react';
import FormInput from 'components/form/FormInput';
import FormTextArea from 'components/form/FormTextArea';
import ProductImageUploader from 'containers/Product/ProductImageUploader';
import { FormContextCustom } from 'components/context/FormContextCustom';
import CustomButton from 'components/CustomButton';

const ProductEdit = () => {

  const { id } = useParams();
  const editorRef = useRef(null);

  const [ mContent, setContent ] = useState({ images: [] });
  useEffectAsync(async () => {
    const { data, errorCode } = await RequestUtils.Get("/product/find-by-id", { id });
    if(errorCode !== SUCCESS_CODE) {
      return;
    }
    const { name, images } = data;
    for(let image of images) {
      image.url = String(GATEWAY).concat(image.fileName);
      delete image.fileName;
    }
    setContent({images, name, ...(data?.content ?? {})});
  }, [id]);

  const insertImageToEditor = (url) => {
    if (editorRef.current) {
      editorRef.current.insertImage(url);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sửa nội dung sản phẩm</title>
      </Helmet>
      <CustomBreadcrumb
        data={[{ title: 'Trang chủ' }, { title: 'Sản phẩm' }, { title: mContent?.name ?? '' }]}
      />
      <RestEditModal
        record={mContent}
        updateRecord={(values) => setContent(preVal => ({...preVal, ...values}))}
      >
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col md={24} xs={24}>
            <FormHidden name={'id'} />
          </Col>
          <Col md={12} xs={24}>
            <FormInput
              required
              label="Tiêu đề"
              name="title"
              placeholder={"Nhập tiêu đề"}
            />
            <FormTextArea 
              required
              label="Mô tả"
              name="description"
              placeholder={"Nhập mô tả"}
            />
            <FormJoditEditor 
              name="content"
              ref={editorRef}
            />
            <CustomButton 
              title='Cập nhật'
              htmlType="submit"
              style={{marginTop: 20}}
            />
          </Col>
          <Col md={12} xs={24}>
            <ProductImageUploader
              onBeforeSubmitMultiPart={(formData) => {
                formData.append('productId', id);
                return formData;
              }}
              title='Tải lên ảnh sản phẩm'
              apiUploadMultiPart="/product/upload-multi-part"
              apiUploadUrlFile="/product/upload-url"
              onClickAddImageToContent={insertImageToEditor}
            />
          </Col>
        </Row>
      </RestEditModal>
    </>
  )
};

const FormJoditEditor = forwardRef(({ name, placeholder }, ref) => {

  const { form } = useContext(FormContextCustom);
  const [ editorValue, setEditorValue ] = useState('');
  const joditInstance = useRef(null);

  const config = {
    placeholder: placeholder || '',
    minHeight: 700,
    spellcheck: true,
    enter: "BR"
  };

  const handleChange = (newContent) => {
    const content = newContent || '';
    form.setFieldValue([name], content);
  };

  /* Hàm public để chèn ảnh (sẽ được gọi từ ngoài) */
  useImperativeHandle(ref, () => ({
    insertImage: (imageUrl) => {
      console.log({imageUrl})
      if (!joditInstance.current) {
        return;
      }
      const editor = joditInstance.current;
      const imgHtml = `
        <p style="text-align: center;">
          <img src="${imageUrl}" style="max-width: 600px; height: auto;" />
        </p>
      `;
      try {
        editor.selection.insertHTML(imgHtml);
        handleChange(editor.value);
      } catch (err) {
        console.error('Insert failed:', err);
      }
    }
    /* eslint-disable-next-line */
  }), [form, name]);

  useEffect(() => {
    const allValues = form.getFieldsValue(true);
    const fieldValue = allValues[name];
    setEditorValue(fieldValue || '');
  }, [form, name]);

  return (
   <JoditEditor
      value={editorValue}
      config={config}
      onChange={handleChange}
      ref={(editor) => {
        joditInstance.current = editor;
      }}
    />
  )
});

export default ProductEdit;