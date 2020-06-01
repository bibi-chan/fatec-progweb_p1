import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuerryService {

  constructor() { }

  public query = new BehaviorSubject<string>('');

  public getQuery(){
      return this.query;
  }

  public setQuery(queryStr){
      this.query.next(queryStr);
  }
}
