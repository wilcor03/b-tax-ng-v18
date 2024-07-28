import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

//angular material

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers/app.reducer';
import { storeData } from './store/actions/bce.actions';

// register Handsontable's modules
registerAllModules();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    HotTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tax';

  constructor(private _store: Store<AppState>){
    this._store.select('bce').subscribe(bce => console.log('la data', bce))
  }

  testing(){
    this._store.dispatch(storeData({text: 'el texto'}))
  }  

  tiles = [
    {text: 'Tile 1', cols: 1, rows: 1, image: 'assets/image1.jpg', content: 'Content for tile 1'},
    {text: 'Tile 2', cols: 1, rows: 2, image: 'assets/image2.jpg', content: 'Content for tile 2'},
    {text: 'Tile 3', cols: 2, rows: 1, image: 'assets/image3.jpg', content: 'Content for tile 3'},
    {text: 'Tile 4', cols: 1, rows: 1, image: 'assets/image4.jpg', content: 'Content for tile 4'}
  ];
}
