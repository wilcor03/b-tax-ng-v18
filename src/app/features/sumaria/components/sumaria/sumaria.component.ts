import { AfterViewInit, Component, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';

import { registerAllModules } from 'handsontable/registry';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';

import { take, tap } from 'rxjs';
import { loadData, storeData } from '@store/actions/sumaria.actions';
import { bceAndSumariaMergeData } from 'src/app/store/selectors/sumaria.selectors';
import { SUMARIA_HOT_SETTINGS } from '@features/sumaria/config/handsontable.config';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SelectTemplateDialogComponent } from '@shared/components/select-template-dialog/select-template-dialog.component';

registerAllModules();

@Component({
  selector: 'app-sumaria',
  standalone: true,
  imports: [CommonModule,
  HotTableModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule],
  templateUrl: './sumaria.component.html',
  styleUrl: './sumaria.component.scss'
})
export class SumariaComponent implements AfterViewInit {
  private _mainTable = new HotTableRegisterer();
  private _hsInstance!: Handsontable;
  private readonly _store = inject(Store<AppState>);
  private readonly _dialog = inject(MatDialog);

  tableId = 'taxSumaria';
  hotSettings: Handsontable.GridSettings = SUMARIA_HOT_SETTINGS;

  data$ = this._store.select(bceAndSumariaMergeData);

  ngAfterViewInit(): void {
    this._store.dispatch(loadData());

    this._hsInstance = this._mainTable.getInstance(this.tableId);

    this.data$.pipe(
      take(1),
      tap(data => {
        if (data && Object.keys(data).length > 0) {
          this._mainTable.getInstance(this.tableId).loadData(JSON.parse(JSON.stringify(data)));
        }
      })
    ).subscribe((data) => {
      console.log('from subs sumaria!!!!', data);
    });

    this._hsInstance.addHook('afterChange', this._onDataUpdated.bind(this));
  }

  private _onDataUpdated(data: any, param2: any): void {
    // console.log('lo que cambio', data, 'segundo p', param2)
    // const [ rowIndex, colName, otro, cellValue ] = data;
    // console.log('col name', colName)

    const columsData = this._hsInstance.getDataAtProp('annexes');
    const findedModalDispatcher = columsData.some(item => {
      // console.log('EL ITEM', !!item);
      // console.log('EL ITEM', item);
      return !!item;
    });
    // console.log('ENCONTRADO', finded);


    if(findedModalDispatcher){// console.log('INDEXXX', data[0][0]);
      const selectedRow = this._hsInstance.getSourceDataAtRow(data[0][0]);
      //console.log('SELECTED ROW', selectedRow);

      this._dialog.open(SelectTemplateDialogComponent, {
        data: selectedRow
      });
    }

    const payload = [ ...this._hsInstance.getSourceData() ];
    // console.log('NEW DATA', payload);
    this._store.dispatch(storeData( { payload } ));
  }

  private _openModal(): void {

  }
}
