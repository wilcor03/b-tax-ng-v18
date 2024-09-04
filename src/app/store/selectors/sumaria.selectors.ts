import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SumariaStateModel } from '../reducers/sumaria.reducer';
import { bceItemsMoveToSumariaSelector } from './bce.selectors';
import { SUMARIA_EMTPY_TEMPLATE_TABLE_OBJECT } from '@features/sumaria/config/handsontable.config';
import { BceModel } from '@features/bce/models/bce.model';
import { SumariaModel } from '@features/sumaria/interfaces/sumaria.interface';

export const selectSumaria = createFeatureSelector<SumariaStateModel>('sumaria');

export const sumariaDataSelector = createSelector(
  selectSumaria,
  (state: SumariaStateModel) => {
    if (!state) return [];
    return state.data;
  }
);

export const bceAndSumariaMergeData = createSelector(
  bceItemsMoveToSumariaSelector, sumariaDataSelector,
  (accountsWithBalanceBCE, sumariaDataTable) => { console.log('STATE EN SUMARIA BCE', accountsWithBalanceBCE)

    let bceProps: Partial<SumariaModel>;
    const accountsWithData = accountsWithBalanceBCE.map((bceRow, index) => {
      bceProps = _utilMapBCEAccoutsToSumaria(bceRow, index + 1);

      let sumariaDataDefault = SUMARIA_EMTPY_TEMPLATE_TABLE_OBJECT;

      if ( sumariaDataTable.length > 0 ) {
        const findedSumariaRow = sumariaDataTable.find(sumariaRow => bceRow.pucCode === sumariaRow.pucCode);
        if( findedSumariaRow ) {
          sumariaDataDefault = findedSumariaRow;
        }
      }

      return {
        ...sumariaDataDefault,
        ...bceProps
      }
    });

    const emptyArray = Array.from({ length: 3000 - accountsWithData.length }, () => (SUMARIA_EMTPY_TEMPLATE_TABLE_OBJECT));

    console.log('EL MAP', [...accountsWithData, ...emptyArray]);
    return [...accountsWithData, ...emptyArray];
  }
);

// UTLS

const _utilMapBCEAccoutsToSumaria = (bceRow: BceModel, rowNumber: number): Partial<SumariaModel> => ({
  pucCode: bceRow.pucCode,
  accountName: bceRow.accountName,
  accountingValue: bceRow.balanceToTransfer,
  taxIncomeBalance: `=G${ rowNumber } - I${ rowNumber } + J${ rowNumber }`,
  cell: `=SPLIT(D${ rowNumber }, 0)`
});
