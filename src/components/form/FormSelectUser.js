import { useState } from 'react';
import FormSelect from './FormSelect';
import RequestUtils from 'utils/RequestUtils';
import { arrayNotEmpty } from 'utils/dataUtils';
import { useEffectAsync } from 'hooks/MyHooks';

const FormSelectUser = ({name, label, filter, ...props}) => {

	const [ data, setData ] = useState([]);
	useEffectAsync( async() => {
		const { data } = await RequestUtils.Get('/user/list', filter);
		if(arrayNotEmpty(data?.embedded)) {
			setData(data.embedded);
		}
	}, [filter]);

	return (
		<FormSelect
			label={label}
			placeholder={label}
			name={name || 'ssoId'}
			valueProp="id"
			titleProp="ssoId"
			resourceData={data}
			{...props}
		/>
  );
}

export default FormSelectUser;