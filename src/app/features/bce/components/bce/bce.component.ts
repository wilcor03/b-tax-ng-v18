import { AfterViewInit, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { take, tap } from 'rxjs';

import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { loadData, storeData } from 'src/app/store/actions/bce.actions';
import { bceDataSelector } from '@store/selectors/bce.selectors';

import { BceModel } from '@features/bce/models/bce.model';
import { BCE_HOT_SETTINGS } from '@features/bce/config/handsontable.config';
import { AccountLevel, HSTableModel } from '@features/bce/models/config.model';

registerAllModules();

// const DUMMY_DATA = [
//   {id: 1, pucCode: '1100501', accountName: 'Wall Street', balance31Dec: 12000, nivel: null, showLevel:'=SUM(C:C)'},
//   {id: 2, pucCode: '110050101', accountName: 'Pennsylvania Avenue', balance31Dec: 7500, nivel: null, showLevel:null},
//   {id: 3, pucCode: '11005010501', accountName: 'Broadway', balance31Dec: 12000, nivel: null, showLevel:null},
//   {id: 4, pucCode: '1100501', accountName: 'Bourbon Street', balance31Dec: 12000, nivel: null, showLevel:null},
//   {id: 5, pucCode: '1100501', accountName: 'Lombard Street', balance31Dec: 12000, nivel: null, showLevel:null},
//   {id: 6, pucCode: '11100501', accountName: 'Rodeo Drive', balance31Dec: 12000, nivel: null, showLevel:null},
//   {id: 7, pucCode: '1100501', accountName: 'Sunset Boulevard', balance31Dec: 12000, nivel: null, showLevel:null},
//   {id: 8, pucCode: '1100501', accountName: 'Michigan Avenue', balance31Dec: 12000, nivel: null, showLevel:null},
// ];

@Component({
  selector: 'app-bce',
  standalone: true,
  imports: [CommonModule, HotTableModule, MatSelectModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './bce.component.html',
  styleUrl: './bce.component.scss'
})
export class BceComponent implements AfterViewInit {
  selectedLevel = new FormControl('');

  levels: AccountLevel[] = [
    { value: '4', viewValue: 'NIVEL 4' },
    { value: '5', viewValue: 'NIVEL 5' },
    { value: '6', viewValue: 'NIVEL 6' },
    { value: '7', viewValue: 'NIVEL 7' },
    { value: '8', viewValue: 'NIVEL 8' },
    { value: '9', viewValue: 'NIVEL 9' },
  ];

  private _mainTable = new HotTableRegisterer();
  tableId = 'taxBCE';
  hotSettings: Handsontable.GridSettings = BCE_HOT_SETTINGS;
  mainData: HSTableModel[] = [];

  private readonly _store = inject(Store<AppState>);

  data$ = this._store.select(bceDataSelector);  

  ngAfterViewInit(): void {
    this._store.dispatch(loadData());

    this.data$.pipe(
      take(1),
      tap(data => {
        if (data && Object.keys(data).length > 0) {
          this._mainTable.getInstance(this.tableId).loadData(JSON.parse(JSON.stringify(data)));
          const selectedLevel =  data.find((row: any) => row.accountLevel);
          if ( selectedLevel ) {
            const parts = selectedLevel.accountLevel.split(' ');

            setTimeout(() => {
              this.selectedLevel.setValue(parts[1]);
            }, 300);
          };
        }
        // this._mainTable.getInstance(this.tableId).setSourceDataAtCell(data);
        // this._mainTable.getInstance(this.tableId).setDataAtRowProp(data);
        // this._mainTable.getInstance(this.tableId).setSourceDataAtRow();

        // this._mainTable.getInstance(this.tableId).clear();

        // setTimeout(() => {
        // }, 1000);
        // this.mainData = [ ...data ];
      })
    ).subscribe((data) => {
      console.log('from subs!!!!', data);
      // this._stopInitialExecution$.next();
      // this._stopInitialExecution$.complete();
    });

    this._mainTable.getInstance(this.tableId).addHook('afterInit', () => {
      console.log('arranco!!');
    });

    this._mainTable.getInstance(this.tableId).addHook('afterChange', this._onChangeLevel.bind(this));
    this.selectedLevel.valueChanges.subscribe(this._onChangeLevel.bind(this));

    // Handsontable.validators.DropdownValidator

    
    // const payload =  { id: null, pucCode: null, accountName: null, balance31Dec: null, nivel: null, showLevel:null };
    

    // const info = [...DUMMY_DATA, ...this._setEmpty()]
    // this.data.set(info);
    // this._mainTable.addHook('beforeCreateRow', (row, amount) => {
    //   if (!hyperFormula.isItPossibleToAddRows(0, [row, amount])) {
    //     return false;
    //   }
    // })


    
    // setTimeout(() => {
      

    // this._mainTable.getInstance(this.tableId).addHook('afterChange', (changes) => {      
    //   // this._store.dispatch(storeData( { payload: [] } ));      
    //   this._onChangeLevel();

      // setTimeout(() => {
      // }, 1000);



      //OLD CODE

      // changes?.forEach(async([row, col, oldValue, newValue]) => { console.log('ejecuto cambios!!!')
      //   const data:HSTableModel = [ row, col as ColumTypes, newValue ];
        // console.log('DATOS DE LA FILA', this._mainTable.getInstance(this.tableId).getDataAtRow(row));

        // const pucCodes = this.mainData.filter(item => (item[1] === 'pucCode'));
        // await pucCodes.forEach(puc => {
        //   const moveToSumaria:HSTableModel = [ puc[0], 'moveToSumaria', false ]; 
        //   this.mainData = [ ...this.mainData, moveToSumaria ];
        // });

        // if ( oldValue !== null ) {
        //   console.log(row, col, oldValue);
        //   const findedIndex = this.mainData.findIndex(ele => {
        //     return ele[0] === row && ele[1] === col;
        //   });

        //   if(findedIndex !== -1){
        //     this.mainData.splice(findedIndex, 1, data);
        //   }
          
        // } else {
        //   this.mainData = [ ...this.mainData, data ];
        // }

        // this._store.dispatch(storeData( { payload: [ ...this.mainData ] } ));
        // this._onChangeLevel();
      // });
    // });

      // const changes = [
      //   [0, 'pucCode', 11100501],
      //   [0, 'accountName', 'nombre de la cuenta --'],
      //   [1, 'pucCode', 11100502],
      //   [1, 'nivel', 'NIVEL11'],
      //   [0, 'nivel', 'NIVEL5']
      // ];
      // this._mainTable.getInstance(this.tableId).setSourceDataAtCell(changes as any);
      // this._mainTable.getInstance(this.tableId).addHook('afterCreateRow', (row, amount) => {
      //   console.log(`${amount} row(s) were created, starting at index ${row}`);
      // });
      
      // this._mainTable.getInstance(this.tableId).setDataAtRowProp(changes as any);      
      // this._mainTable.getInstance(this.tableId).setDataAtCell(0, 1, 'Ford');
      // this._mainTable.getInstance(this.tableId).loadData(DUMMY_DATA);
      // this._mainTable.getInstance(this.tableId).updateData(DUMMY_DATA);
      // this._store.dispatch(storeData({ payload: {id: 999} as BceModel  }))
    // }, 1000)
  }

  private _onChangeLevel(){
    const selectedLevel = this.selectedLevel.value;
    
    if ( selectedLevel ) {
      const changes = this._mainTable.getInstance(this.tableId).getDataAtProp('pucCode')
      .map((row, index) => ({
        id: index,
        content: row
      }))
      .filter(row => row.content !== null &&  row.content !== '')
      .map(({ id, content }) => {

        const levelLen = String(content).length;
        let newLevel = null;
        let newBalance = null;

        if( Number(levelLen) === Number(selectedLevel) ){
          newLevel = `NIVEL ${levelLen}`;
          newBalance = this._mainTable.getInstance(this.tableId).getDataAtRowProp(id, 'balance31Dec');
        }

        return [ 
          [id, 'accountLevel', newLevel],
          [id, 'balanceToTransfer', newBalance ]
        ];
      });
      
      this._mainTable.getInstance(this.tableId).setSourceDataAtCell(changes.flat(1) as any);
    }

    const payload = [ ...this._mainTable.getInstance(this.tableId).getSourceData() ] as BceModel[];
    console.log('NEW DATA', payload);
    this._store.dispatch(storeData( { payload } ));
    
    // console.log('pucCODESSS', pucCodes);
    
    // pucCodes.forEach(row => {

    // });
    // this._mainTable.getInstance(this.tableId).setDataAtRowProp()
    // console.log('PUCS', pucCodes);
    // const pucCodes = this.mainData.filter(item => (item[1] === 'pucCode'));
    // const value = this.selectedLevel.value;
    // const data: HSTableModel[] = [];
    // pucCodes.forEach(puc => {
    //   if( String(puc[2]).length === Number(value) ) {
    //     data.push([puc[0], 'accountLevel', `NIVEL ${value}`]);
    //     // data.push([puc[0], 'moveToSumaria', true]);

    //     const balance = this.mainData.filter(ele => ele[1] === 'balance31Dec').find(ele => ele[0] === puc[0]);
    //     console.log('EL BALANCE', balance);

    //     data.push([puc[0], 'balanceToTransfer', balance ? balance[2]: null]);
    //   } else {
    //     data.push([puc[0], 'accountLevel', null]);
    //     data.push([puc[0], 'balanceToTransfer', null]);
    //     // data.push([puc[0], 'moveToSumaria', false]);
    //   }
    // });

    // this._mainTable.getInstance(this.tableId).setSourceDataAtCell(data as any);
    // // console.log('DTA DE LAS CELDAS', this._mainTable.getInstance(this.tableId).getData());
    // // console.log('DTA DE LAS CELDAS', this._mainTable.getInstance(this.tableId).getDataAtRowProp(0, 'accountLevel'));
    // // console.log('DTA DE LAS CELDAS', this._mainTable.getInstance(this.tableId).getDataAtProp('accountLevel'));
    // // console.log('DTA DE LAS CELDAS', this._mainTable.getInstance(this.tableId).getSourceDataAtRow(0)); //trae objeto de propiedades
    // console.log('DTA DE LAS CELDAS', this._mainTable.getInstance(this.tableId).getSourceData());

    // const oldData = this._mainTable.getInstance(this.tableId).getSourceData();

    // setTimeout(() => {
    //   this._mainTable.getInstance(this.tableId).clear();
    // }, 2000);

    // setTimeout(() => {
    //   this._mainTable.getInstance(this.tableId).setSourceDataAtCell(oldData as any);
    // }, 5000);
  }

  // private _setEmpty(){
  //   const data: string[][] = new Array((3000 - DUMMY_DATA.length))
  //   .fill(null)
  //   .map((_, index) => { //console.log('el index', index)
  //     return new Array(6) // number of columns
  //       .fill(null)
  //   });
  //   return data;

    // const data = [];
    // const initialData = { id: null, codigoPuc: null, nombreCuenta: null, saldoA31Dic: null, nivel: null, showLevel:null };
    
    // for(let i = 0; i < (3000 - DUMMY_DATA.length); i++){
    //   data.push({...initialData});
    // }
    // return data;
  // }
}