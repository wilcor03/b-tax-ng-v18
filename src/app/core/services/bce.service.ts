import { inject, Injectable } from '@angular/core';
import { BceModel } from '@core/models/bce.model';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class BceService {

  private readonly _store = inject(Store<AppState>);

  data: any[] = [];

  load():Observable<Partial<BceModel[]>> {
    // const changes = [
    //   [0, 'pucCode', 11100501],
    //   [0, 'accountName', 'nombre de la cuenta --'],
    //   [1, 'pucCode', 11100502],
    //   [1, 'nivel', 'NIVEL11'],
    //   [0, 'nivel', 'NIVEL5']
    // ];

    // this.data = changes;
    return of(this.data);
  }

  store(payload: any):Observable<Partial<BceModel[]>> {
    this.data = [...payload];
    // console.log('FROM PAYLOAD SERVICE', payload);
    return of(this.data);
  }
}
