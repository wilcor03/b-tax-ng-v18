import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class EmptyCanvasService {

  private readonly _store = inject(Store<AppState>);

  data: any[] = [];

  load():Observable<Partial<any[]>> {
    //   [0, 'pucCode', 11100501],
    //   [0, 'accountName', 'nombre de la cuenta --'],
    //   [1, 'pucCode', 11100502],
    //   [1, 'nivel', 'NIVEL11'],
    //   [0, 'nivel', 'NIVEL5']
    // ];

    // this.data = changes;
    // console.log('DATA FROM SERVICE', this.data)
    return of(this.data);
  }

  store(payload: any[]):Observable<any[]> {
    this.data = [...payload];
    console.log('FROM PAYLOAD SERVICE EMPTY DATA', payload);
    return of(this.data);
  }
}
