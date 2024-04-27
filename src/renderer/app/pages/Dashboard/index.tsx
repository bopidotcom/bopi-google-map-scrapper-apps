import { useEffect } from 'react';
import FilterForm from './filterForm';
import ResultTable from './resultTable';
import OnSubmitReturnForm from '../../../../interfaces/types/OnSubmitReturnForm';
import { useState } from 'react';
import { submitState } from '../../../../enum';
import Place from '../../../../interfaces/types/Place';


function DashboardPage() {
  let [processState, setProcessState] = useState<submitState>(submitState.idle);
  let [queryText, setQueryText] = useState<string>(null);
  let [places, setPlaces] = useState<Place[]>([]);


  const onSubmit = (form: OnSubmitReturnForm) => {
    setProcessState(submitState.submitting);
    setQueryText(form.queryValue + (form.queryValueLocation? ' di ' + form.queryValueLocation : ''))
    window.api.startGoogleMapScrappingTask(form);
  }

  const onCancel = () => {
    setProcessState(submitState.submitting);
    window.api.stopGoogleMapScrappingTask();
    // setProcessState(submitState.idle)
  }

  const handleMainEvent = () => {
    window.api.receiveGoogleMapScrappingTaskState((value: any[]) => {
      setProcessState(value[0])
    });
    window.api.receiveGoogleMapScrappingResult((value: any[]) => {
      // console.log(value ? value[0] : null)
      if (value) {
        addNewPlace(value[0])
      }
    });
  }

  const removeMainEvent = () => {
    window.api.removeGoogleMapScrappingTaskState();
    window.api.removeGoogleMapScrappingResultEvent();
  }

  const addNewPlace = (place: Place) => {
    setPlaces(current => [...current, place]);
  }

  const clearPlaces = () => {
    setPlaces([]);
  }

  const doExport = async (places: Place[]) => {
    try {
      window.api.showNotification('Export File', 'Memproses file export...');
      const response = await window.api.showSaveXlsxDialog(places, queryText);
      if (!response.canceled) {
        window.api.showNotification('Export File', 'File berhasil disimpan dalam bentuk xlsx');
        // console.log(response.filePath)
      }
    } catch (e) {
      window.api.showErrorAlert({
        title: 'Error!',
        content: 'Gagal menyipan file'
      });
      console.error(e)
    }
  }

  useEffect(() => {
    handleMainEvent();
    return () => {
      removeMainEvent();
    };
  }, []);



  return (
    <div className={`text-base`}>
      <FilterForm onSubmit={onSubmit} processState={processState} onCancel={onCancel}/>
      <div className={`mt-5`}>
        <ResultTable places={places} onClear={clearPlaces} onExport={doExport}/>
      </div>
    </div>
  )
}

export default DashboardPage;