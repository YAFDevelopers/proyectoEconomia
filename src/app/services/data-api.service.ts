import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import {observable, from, Observable, BehaviorSubject, combineLatest} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {RegistroEgreso} from '../models/RegistroEgreso';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private registrosCollection: AngularFirestoreCollection <RegistroEgreso>;
  private registro: Observable<RegistroEgreso[]>;
  private idFilter$: BehaviorSubject<string|null>;
  private fechaFilter$: BehaviorSubject<Date|null>;

  constructor(private db:AngularFirestore) { 
    this.idFilter$ = new BehaviorSubject(null);
    this.registro = combineLatest(
      this.idFilter$
    ).pipe(
      switchMap(([id])=>
        db.collection('RegistroEgreso',ref =>{
          let query :firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (id) {query = query.where('id','==',id)};
          return query;
        }).valueChanges()
      )
    );
  }

  filterId(id:string|null){
    return this.idFilter$.next(id);
  }

}
