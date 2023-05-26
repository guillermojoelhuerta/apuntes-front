//import { Injectable } from '@angular/core';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StorageService{
  private onSubject = new Subject<{ key: string, value: any }>();
  //public changes = this.onSubject.asObservable().share();

  /*
  constructor() {
    this.start();
  }*/

  /*
  ngOnDestroy() {
    this.stop();
  }*/

  /*
  // Se obtiene todas las claves del Local Storage
  public getAllStorage() {
    const s = [];
    for (let i = 0; i < localStorage.length; i++) {
      s.push({
        key: localStorage.key(i),
        value: localStorage.getItem(localStorage.key(i))
      });
    }
    return s;
  }*/
  
  clearAllStorage() {
    localStorage.removeItem("token");                 
    for (let i = 0; i < localStorage.length; i++) {
      //console.log("key = " + localStorage.key(i));     
      //console.log("valor = " + localStorage.getItem(""+ localStorage.key(i) +""));
      localStorage.removeItem(""+ localStorage.key(i) +"");           
    }                                                                                                                   
  }     

  public storeKey(key: string, data: any): void {
    localStorage.setItem(key, data);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key: key, value: data });
  }

  public getKey(key: string){
    return localStorage.getItem(key);
  }

  
  public clearKey(key: any) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key: key, value: null });
  }

  /* 
  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v;
      try {
        v = JSON.parse(event.newValue);
      } catch (e) {
        v = event.newValue;
      }
      this.onSubject.next({ key: event.key, value: v });
    }
  }*/
  
  /*
  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }*/

  /*
  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }*/ 
}
