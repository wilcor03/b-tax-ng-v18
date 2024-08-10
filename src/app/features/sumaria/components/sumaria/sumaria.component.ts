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

registerAllModules();

@Component({
  selector: 'app-sumaria',
  standalone: true,
  imports: [CommonModule, HotTableModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sumaria.component.html',
  styleUrl: './sumaria.component.scss'
})
export class SumariaComponent implements AfterViewInit {
  private _mainTable = new HotTableRegisterer();
  tableId = 'taxSumaria';

  hotSettings: Handsontable.GridSettings = SUMARIA_HOT_SETTINGS;

  private readonly _store = inject(Store<AppState>);
  data$ = this._store.select(bceAndSumariaMergeData);

  ngAfterViewInit(): void {
    this._store.dispatch(loadData());

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

    this._mainTable.getInstance(this.tableId).addHook('afterChange', this._onDataUpdated.bind(this));
  }

  private _onDataUpdated(): void {
    const payload = [ ...this._mainTable.getInstance(this.tableId).getSourceData() ];
    console.log('NEW DATA', payload);
    this._store.dispatch(storeData( { payload } ));
  }
}
