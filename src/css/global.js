import styled from 'styled-components';
import { Row } from 'antd';

export const FormListStyles = styled(Row)`
  .form-list {
    &__list-item {
      position: relative;
      padding: 15px;
      border: 2px dashed #ccc;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    &__remove-button {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 25px;
    }
  }
  .ant-col .ant-form-item {
    margin-bottom: 0px !important;
  }
`;
