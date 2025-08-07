import { useGetOrderCodeQuery } from 'hooks/useData';
import FormSelectInfinite from './FormSelectInfinite';

const FormInfiniteOrderCode = props => {
  return (
    <FormSelectInfinite
      useGetAllQuery={useGetOrderCodeQuery}
      name="orderCode"
      valueProp="code"
      titleProp="code"
      searchKey="code"
      filterField="code"
      initialFilter={{page: 1, type: 'order'}}
      {...props}
    />
  );
};

export default FormInfiniteOrderCode;
