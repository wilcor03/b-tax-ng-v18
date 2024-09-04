export interface SumariaModel {
  readonly pucCode: string | null;
  readonly r33: string | null;
  readonly f2516: string | null;
  readonly cell110: string | null;
  readonly cell: string | null;  // renglón
  readonly accountName: string | null;
  readonly accountingValue: number | null;
  readonly annexes: string | null;
  readonly lowerTaxValue: number | null;
  readonly higherTaxValue: number | null;
  readonly taxIncomeBalance: string | null;
  readonly observations: string | null;
}