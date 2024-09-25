import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import Handsontable from 'handsontable';
import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers/app.reducer';
import { HS_HOT_SETTINGS } from '@features/empty-canvas/config/handsontable.config';
import { loadData, storeData } from '@store/actions/empty-canvas.actions';
import { take, tap } from 'rxjs';
import { emptyCanvasDataSelector } from '@store/selectors/empty-canvas.selectors';


@Component({
  selector: 'app-empty-canvas-grid',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    HotTableModule
  ],
  templateUrl: './empty-canvas-grid.component.html',
  styleUrl: './empty-canvas-grid.component.scss'
})
export class EmptyCanvasGridComponent implements AfterViewInit {
  private _mainTable = new HotTableRegisterer();
  private _hsInstance!: Handsontable;
  private readonly _store = inject(Store<AppState>);
  private readonly _dialog = inject(MatDialog);

  tableId = 'emptyCanvas';
  hotSettings: Handsontable.GridSettings = HS_HOT_SETTINGS;

  data$ = this._store.select(emptyCanvasDataSelector);

  ngAfterViewInit(): void {
    this._store.dispatch(loadData());

    this._hsInstance = this._mainTable.getInstance(this.tableId);

    // this._store.select('empty-canvas').subscribe((data) => console.log('DATA EMPTY', data));

    this.data$.pipe(
      take(1),
      tap(data => {
        if (data && Object.keys(data).length > 0) {
          this._mainTable.getInstance(this.tableId).loadData(JSON.parse(JSON.stringify(data)));
        }
      })
    ).subscribe((data) => {
      console.log('from subs EMPTY CANVAS!!!!', data);
    });

    this._hsInstance.addHook('afterChange', this._onDataUpdated.bind(this));
  }

  private _onDataUpdated(data: any, param2: any): void {
    console.log('lo que cambio', data, 'segundo p', param2)
    // const [ rowIndex, colName, otro, cellValue ] = data;
    // console.log('col name', colName)

    const payload = [ ...this._hsInstance.getSourceData() ];
    console.log('PAYLOAD', payload);

    this._store.dispatch(storeData( { payload } ));
  }
}
