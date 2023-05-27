import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from "./confirm-dialog.service"; 
 
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {  
    message: any;  
    constructor(  
        private confirmDialogService: ConfirmDialogService  
    ) { }  

    ngOnInit() {  
        console.log("componente confirm");
        //this function waits for a message from alert service, it gets   
        //triggered when we call this from any other component  
        /*this.confirmDialogService.getMessage().subscribe(message => {  
            console.log("message --->", message);                                                 
            this.message = message;  
        });  */
        console.log(this.confirmDialogService.getMessage());
        //this.confirmDialogService.avanza();  
        this.confirmDialogService.getMessage().subscribe((message:any) => {console.log("messa -- ",message)});
        
        /*let y = this.confirmDialogService.getMessage().subscribe({
            next: (v) => console.log(`observerA: ${v}`)
        });*/
    
    }  
}  