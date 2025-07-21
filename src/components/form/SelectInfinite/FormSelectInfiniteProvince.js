import { useGetAllProvinceQuery } from 'hooks/useData';
import FormSelectInfinite from './FormSelectInfinite';

const FormSelectInfiniteProvince = ({ name, ...props }) => {
  return (
    <FormSelectInfinite
      useGetAllQuery={useGetAllProvinceQuery}
      name={name || "provinceId"}
      valueProp="id"
      titleProp="name"
      searchKey="name"
      filterField="id"
      {...props}
    />
  );
};

export default FormSelectInfiniteProvince;
