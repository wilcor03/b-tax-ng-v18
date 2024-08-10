import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { BceModel } from '../models/bce.model';

@Injectable({
  providedIn: 'root'
})
export class BceService {
  data: BceModel[] = [];

  load():Observable<Partial<BceModel[]>> {
    return of(this.data);
  }

  store(payload: any):Observable<Partial<BceModel[]>> {
    this.data = [...payload];
    // console.log('FROM PAYLOAD SERVICE', payload);
    return of(this.data);
  }
}
