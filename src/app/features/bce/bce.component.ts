import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { ContextMenu } from 'handsontable/plugins';
import { registerAllModules } from 'handsontable/registry';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


import { HyperFormula } from 'hyperformula';

registerAllModules();


interface Food {
  value: string;
  viewValue: string;
}

const DUMMY_DATA = [
  {id: 1, codigoPuc: '1100501', nombreCuenta: 'Wall Street', saldoA31Dic: 12000, nivel: null, showLevel:'=SUM(C:C)'},
  {id: 2, codigoPuc: '110050101', nombreCuenta: 'Pennsylvania Avenue', saldoA31Dic: 7500, nivel: null, showLevel:null},
  {id: 3, codigoPuc: '11005010501', nombreCuenta: 'Broadway', saldoA31Dic: 12000, nivel: null, showLevel:null},
  {id: 4, codigoPuc: '1100501', nombreCuenta: 'Bourbon Street', saldoA31Dic: 12000, nivel: null, showLevel:null},
  {id: 5, codigoPuc: '1100501', nombreCuenta: 'Lombard Street', saldoA31Dic: 12000, nivel: null, showLevel:null},
  {id: 6, codigoPuc: '11100501', nombreCuenta: 'Rodeo Drive', saldoA31Dic: 12000, nivel: null, showLevel:null},
  {id: 7, codigoPuc: '1100501', nombreCuenta: 'Sunset Boulevard', saldoA31Dic: 12000, nivel: null, showLevel:null},
  {id: 8, codigoPuc: '1100501', nombreCuenta: 'Michigan Avenue', saldoA31Dic: 12000, nivel: null, showLevel:null},
];

@Component({
  selector: 'app-bce',
  standalone: true,
  imports: [CommonModule, HotTableModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bce.component.html',
  styleUrl: './bce.component.scss'
})
export class BceComponent implements OnInit{
  // dataset: any[] = [
  //   {id: 1, codigoPuc: 'Ted Right', nombreCuenta: 'Wall Street', saldoA31Dic: 12000, nivel: null},
  //   {id: 2, codigoPuc: 'Frank Honest', nombreCuenta: 'Pennsylvania Avenue', saldoA31Dic: 12000, nivel: null},
  //   {id: 3, codigoPuc: 'Joan Well', nombreCuenta: 'Broadway', saldoA31Dic: 12000, nivel: null},
  //   {id: 4, codigoPuc: 'Gail Polite', nombreCuenta: 'Bourbon Street', saldoA31Dic: 12000, nivel: null},
  //   {id: 5, codigoPuc: 'Michael Fair', nombreCuenta: 'Lombard Street', saldoA31Dic: 12000, nivel: null},
  //   {id: 6, codigoPuc: 'Mia Fair', nombreCuenta: 'Rodeo Drive', saldoA31Dic: 12000, nivel: null},
  //   {id: 7, codigoPuc: 'Cora Fair', nombreCuenta: 'Sunset Boulevard', saldoA31Dic: 12000, nivel: null},
  //   {id: 8, codigoPuc: 'Jack Right', nombreCuenta: 'Michigan Avenue', saldoA31Dic: 12000, nivel: null},
  // ];
  

  selectedLevel = new FormControl('');

  levels: Food[] = [
    {value: 'level4', viewValue: 'NIVEL 4'},
    {value: 'level5', viewValue: 'NIVEL 5'},
    {value: 'level6', viewValue: 'NIVEL 6'},
    {value: 'level7', viewValue: 'NIVEL 7'},
    {value: 'level8', viewValue: 'NIVEL 8'},
    {value: 'level9', viewValue: 'NIVEL 9'},
  ];

  data = signal<any[]>([]);

  hotSettings: Handsontable.GridSettings = {
    colHeaders:['CÓDIGO PUC', 'NOMBRE DE LA CUENTA', 'SALDO A 31 DIC', 'NIVEL', 'SHOW LEVEL'],
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
    className: 'htCenter',
    // height: 'auto',
    colWidths: [100, 400, 150, 100, 100],
    autoWrapRow: true,
    autoWrapCol: true,
    licenseKey: 'non-commercial-and-evaluation',
    columns: [
      { data: 'codigoPuc', readOnly: true },
      { data: 'nombreCuenta' },
      { 
        data: 'saldoA31Dic',
        type: 'numeric',
        numericFormat: {
          pattern: '$0,0.00',
          culture: 'en-US', // this is the default culture, set up for USD
        },
        allowEmpty: false,
        readOnly: true
      },
      { data: 'nivel' },
      { data: 'showLevel'}
    ],
    width: '100%',
    height: '80vh',
    rowHeaders: true,
    formulas: {
      engine: HyperFormula,
    },
  };

  ngOnInit(): void {   

    const info = [...DUMMY_DATA, ...this._setEmpty()]
    this.data.set(info);

    this.selectedLevel.valueChanges.subscribe(value => { console.log('valuee', value)
      this.data.update(items => {
        return items.map(item => {
          return {
            ...item,
            nivel: (item.codigoPuc && value === `level${item.codigoPuc.length}`) ? this.levels.find(lv => lv.value === value)?.viewValue : null
          }
        })
      })
    });    
  }

  private _setEmpty(){
    const data = [];
    const initialData = { id: null, codigoPuc: null, nombreCuenta: null, saldoA31Dic: null, nivel: null, showLevel:null };
    
    for(let i = 0; i < (3000 - DUMMY_DATA.length); i++){
      data.push({...initialData});
    }
    return data;
  }
}