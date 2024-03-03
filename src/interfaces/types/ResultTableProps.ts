import Place from './Place';


export default interface ResultTableProps {
  places : Place[];
  onClear : () => void;
  onExport : (csvString: string) => void;
}