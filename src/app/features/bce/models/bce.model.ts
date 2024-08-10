export interface BceModel {
  readonly id: number,
  readonly pucCode: string;
  readonly accountName: string;
  readonly balance31Dec: number;
  readonly accountLevel: string;
  readonly balanceToTransfer: number;
}