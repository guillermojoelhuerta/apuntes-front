import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
//import { Subject } from 'rxjs/Subject';           
  

@Injectable() export class ConfirmDialogService {

    //private subject = new Subject<any>();
    readonly  subject = new BehaviorSubject<any>(0);

    constructor() { }

    context: any;

    confirm(message: string, siFn: () => void, noFn: () => void) {
        let that = this;
        this.subject.next({
            type: "confirm",
            text: message,
            siFn:
                function () {
                    siFn();
                    that.subject.next(0);
                },
            noFn: function () {
                noFn();
                that.subject.next(0);
            },
            exFn: function () {
                that.subject.next(0);
            }
        });

    }

    show(message: string, type: string) {
        let that = this;
        this.subject.next({
            type: type,
            confirm: 2,
            text: message,
            exFn: function () {
                that.subject.next(0);       
            }           
        });

    }               

    showConfirm(message: string, type: string, siFn: () => void) {
        this.subject.next({
            type: (type)?type:'warning',
            text: message,
            confirm: 1,
            siFn: () => {
                siFn();
                this.subject.next(0);
            },
            exFn: () => {
                this.subject.next(0);            
            }               
        });

    }

    getMessage(): Observable<any> {
        //return this.subject.asObservable();
        return new Subject<any>().asObservable();
    }  
    
    /*
    avanza(){
        this.subject.next("true");            
        //return new Subject<any>().asObservable();
    } */ 
}
