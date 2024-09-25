import { HANDSONTABLE_LICENCE } from "@core/config/global-const.config";
import Handsontable from "handsontable";
import { HyperFormula } from 'hyperformula';

export const HS_HOT_SETTINGS: Handsontable.GridSettings = {
  startRows: 3000,
  startCols: 15,
  autoWrapRow: false,
  autoWrapCol: false,
  licenseKey: HANDSONTABLE_LICENCE,
  width: '100%',
  height: '80vh',
  rowHeaders: true,
  colHeaders: true,
  formulas: {
    engine: HyperFormula,
  },
};