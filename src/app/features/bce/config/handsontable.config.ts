import { HANDSONTABLE_LICENCE } from "@core/config/global-const.config";
import Handsontable from "handsontable";
import { ContextMenu } from "handsontable/plugins";

export const BCE_EMTPY_TEMPLATE_TABLE_OBJECT = {
  id: null,
  pucCode: null,
  accountName: null,
  balance31Dec: null,
  accountLevel: null,
  balanceToTransfer: null
};

export const BCE_HOT_SETTINGS: Handsontable.GridSettings = {
  colHeaders:['CÓDIGO PUC', 'NOMBRE DE LA CUENTA', 'SALDO A 31 DIC', 'NIVEL', 'SALDO A TRASLADAR'],
  dataSchema: BCE_EMTPY_TEMPLATE_TABLE_OBJECT,
  contextMenu: {
    items: {
      'row_above': {
        name: 'Insert row above this one (custom name)'
      },
      'row_below': {},
      'separator': ContextMenu.SEPARATOR,
      'clear_custom': {
        name: 'Clear all cells (custom)',
        callback: function() {
          this.clear();
        }
      }
    }
  },
  startRows: 3000,
  colWidths: [100, 400, 150, 100, 150],
  autoWrapRow: true,
  autoWrapCol: true,
  licenseKey: HANDSONTABLE_LICENCE,
  columns: [
    { data: 'pucCode', type: 'numeric' },
    { data: 'accountName' },
    {
      data: 'balance31Dec',
      type: 'numeric',
      numericFormat: {
        pattern: '$0,0.00',
        culture: 'en-US',
      },
      allowEmpty: false
    },
    { data: 'accountLevel', readOnly: true },
    { 
      data: 'balanceToTransfer',
      readOnly: true,
      type: 'numeric',
      numericFormat: {
        pattern: '$0,0.00',
        culture: 'en-US'
      }
    }
  ],
  width: '100%',
  height: '80vh',
  rowHeaders: true
};