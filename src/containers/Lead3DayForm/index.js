import React, { useState } from 'react';
import RestEditModal from 'components/RestLayout/RestEditModal';
import ProductForm from './ProductForm';
import RequestUtils from 'utils/RequestUtils';
import { InAppEvent } from 'utils/FuseUtils';
import { f5List } from 'utils/dataUtils';

const log = (value) => console.log('[container.Lead3Day.index] ', value);
const TakeNotLead = ({ closeModal, data }) => {

  const [ record, setRecord ] = useState({});
  const onSubmit = async (dataCreate) => {
    log(data);
    const { errorCode, message } = await RequestUtils.Post('/data/create-lead-care', dataCreate);
    if (errorCode === 200) {
      f5List('cs/3day-fetch');
      closeModal()
    }
    InAppEvent.normalSuccess(message);
  }

  return <>
      <RestEditModal
        isMergeRecordOnSubmit={false}
        updateRecord={(values) => setRecord(curvals => ({ ...curvals, ...values }))}
        onSubmit={onSubmit}
        record={record}
      >
        <ProductForm />
      </RestEditModal>
  </>
}

export default TakeNotLead;