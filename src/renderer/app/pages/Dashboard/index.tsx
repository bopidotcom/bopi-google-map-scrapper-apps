import FilterForm from './filterForm';
import ResultTable from './resultTable';
import OnSubmitReturnForm from '../../../../interfaces/types/OnSubmitReturnForm';
import { useState } from 'react';
import { submitState } from '../../../../enum';


function DashboardPage() {
  let [processState, setProcessState] = useState<submitState>(submitState.idle);

  const onSubmit = (form: OnSubmitReturnForm) => {
    setProcessState(submitState.submitting)
  }

  const onCancel = () => {
    setProcessState(submitState.idle)
  }

  return (
    <div className={`text-base`}>
      <FilterForm onSubmit={onSubmit} processState={processState} onCancel={onCancel}/>
      <div className={`mt-5`}>
        <ResultTable/>
      </div>
    </div>
  )
}

export default DashboardPage;