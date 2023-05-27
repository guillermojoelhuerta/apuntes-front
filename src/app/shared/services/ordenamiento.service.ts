import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdenamientoService {

  constructor() {}      

  sortArrObj(array_objetos: any = [], key : string, ordenamiento : string){
                    
    key || (key=='nombre'); 
    ordenamiento || (ordenamiento=='asc');    
          
    if(array_objetos.find((x: any) => typeof x[key] !== 'number')) {
      if(ordenamiento == 'desc'){
          array_objetos.sort((i: string, ii: string) => {  
              return ii[key].localeCompare(i[key], 'es', { numeric: true });
          });                                        
      }else if(ordenamiento == 'asc'){                                                      
          array_objetos.sort((i: string, ii: string) => {   
                return i[key].localeCompare(ii[key], 'es', { numeric: true });
          });                                                      
      }       
    }else{    
        if(ordenamiento == 'desc'){        
          array_objetos.sort((a:number, b: number) => b[key] - a[key]);
        }else if(ordenamiento == 'asc'){   
          array_objetos.sort((a:number, b: number) => a[key] - b[key]);
        }
    }
    return array_objetos;  
  }
}
