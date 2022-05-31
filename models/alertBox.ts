type StatusTypes = 'ERROR' | 'SUCCESS' | 'WARNING' | 'INFO' | '';

export interface IAlertBox {
  status: StatusTypes;
  text: string;
  headerText: string;
}
