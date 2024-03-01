import OnSubmitReturnForm from './OnSubmitReturnForm';
import { submitState } from '../../enum';


export default interface FilterFormProps {
  onSubmit : (form: OnSubmitReturnForm) => void,
  onCancel : () => void,
  processState : submitState,
}