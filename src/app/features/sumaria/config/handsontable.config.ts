import { HANDSONTABLE_LICENCE } from "@core/config/global-const.config";
import Handsontable from "handsontable";
import { HyperFormula } from 'hyperformula';
import { SumariaModel } from "../interfaces/sumaria.interface";
import { Field110 } from "@core/interfaces/field-110.interface";


export const SUMARIA_EMTPY_TEMPLATE_TABLE_OBJECT: SumariaModel = {
  pucCode: null,
  r33: null,
  f2516: null,
  cell110: null,
  cell: null,
  accountName: null,
  accountingValue: null,
  annexes: null,
  lowerTaxValue: null,
  higherTaxValue: null,
  taxIncomeBalance: null,
  observations: null
};

export const SUMARIA_HOT_SETTINGS: Handsontable.GridSettings = {
  colHeaders:['CÓDIGO PUC', 'R-33', 'F-2516', 'RENGLÓN FORMATO 110', 'RENGLÓN', 'NOMBRE', 'VALOR CONTABLE', 'ANEXOS', 'MENOR VALOR FISCAL', 'MAYOR VALOR FISCAL', 'SALDO FISCAL RENTA', 'OBSERVACIONES'],
  dataSchema: {
    pucCode: null,
    r33: null,
    f2516: null,
    cell110: null,
    cell: null,
    accountName: null,
    accountingValue: null,
    annexes: null,
    lowerTaxValue: null,
    higherTaxValue: null,
    taxIncomeBalance: null,
    observations: null
  },
  startRows: 3000,
  colWidths: [100, 50, 50, 135, 70, 200, 120, 70, 150, 150, 150, 200],
  autoWrapRow: true,
  autoWrapCol: true,
  licenseKey: HANDSONTABLE_LICENCE,
  columns: [
    { data: 'pucCode', type: 'numeric', readOnly: true },
    { data: 'r33', type: 'numeric' },
    { data: 'f2516', type: 'numeric' },
    { data: 'cell110', type: 'numeric' },
    { data: 'cell', type: 'numeric' },
    { data: 'accountName' },
    { data: 'accountingValue' },
    { data: 'annexes' },
    { data: 'lowerTaxValue' },
    { data: 'higherTaxValue' },
    { data: 'taxIncomeBalance' },
    { data: 'observations' },
  ],
  width: '100%',
  height: '80vh',
  rowHeaders: true,
  formulas: {
    engine: HyperFormula,
  },
};



export const CELLS_110_FORM: Field110[] = [
  { code: '36', description: 'Efectivo y equivalentes al efectivo' },
  { code: '37', description: 'Inversiones e instrumentos financieros derivados' },
  { code: '38', description: 'Cuentas, documentos y arrendamientos financieros por cobrar' },
  { code: '39', description: 'Inventarios' },
  { code: '40', description: 'Activos intangibles' },
  { code: '41', description: 'Activos biológicos' },
  { code: '42', description: 'Propiedades, planta y equipo, propiedades de inversión y ANCMV' },
  { code: '43', description: 'Otros activos' },
  { code: '45', description: 'Pasivos' },
  { code: '47', description: 'Ingresos brutos de actividades ordinarias' },
  { code: '48', description: 'Ingresos financieros' },
  { code: '49', description: 'Dividendos y/o participaciones no constitutivos de renta ni ganancia ocasional (incluye capitalizaciones no gravadas)' },
  { code: '50', description: 'Dividendos y/o participaciones distribuidos por entidades no residentes en Colombia a una CHC y prima en colocación de acciones' },
  { code: '51', description: 'Dividendos y/o participaciones gravadas a la tarifa general provenientes de sociedades y entidades extranjeras o de sociedades nacionales' },
  { code: '52', description: 'Dividendos y/o participaciones gravadas recibidas por personas naturales sin residencia fiscal (año 2016 y anteriores)' },
  { code: '53', description: 'Dividendos y/o participaciones gravadas recibidas por personas naturales sin residencia fiscal (año 2017 y siguientes)' },
  { code: '54', description: 'Dividendos y/o participaciones gravadas al 10%' },
  { code: '55', description: 'Dividendos y/o participaciones gravadas a tarifa general (EP y sociedades extranjeras - utilidades generadas a partir del año 2017)' },
  { code: '56', description: 'Dividendos y/o participaciones provenientes de proyectos calificados como megainversión gravadas al 27%' },
  { code: '57', description: 'Otros ingresos' },
  { code: '59', description: 'Devoluciones, rebajas y descuentos en ventas' },
  { code: '62', description: 'Costos' },
  { code: '63', description: 'Gastos de administración' },
  { code: '64', description: 'Gastos de distribución y ventas' },
  { code: '65', description: 'Gastos financieros' },
  { code: '66', description: 'Otros gastos y deducciones' },
  { code: '70', description: 'Renta por recuperación de deducciones' },
  { code: '01', description: 'No aplica' },
  { code: '80', description: 'Ingresos por ganancias ocasionales' },
  { code: '81', description: 'Costos por ganancias ocasionales' },
  { code: '82', description: 'Ganancias ocacionales no gravadas y exentas' },
  { code: '102',description: 'Crédito fiscal art 256-1ET' }
];