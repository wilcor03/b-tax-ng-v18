import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers/app.reducer';
import { storeData } from './store/actions/bce.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
}
