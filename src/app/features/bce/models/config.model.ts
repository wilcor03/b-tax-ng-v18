export type ColumTypes = 'pucCode' | 'accountName' | 'balance31Dec' | 'accountLevel' | 'balanceToTransfer';

export interface HSTableModel {
  0: number;
  1: ColumTypes;
  2: null | number | string | boolean;
}

export interface AccountLevel {
  value: string;
  viewValue: string;
}