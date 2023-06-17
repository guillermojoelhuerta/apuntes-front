import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApunteService } from '@app/shared/services/apunte.service';
import { Apunte } from '@app/core/models/Apunte.model';
import { ApuntesTodosBusqueda } from '@app/core/models/ApuntesTodosBusqueda.model';
import { Paginacion } from '@app/core/models/Paginacion.model';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos-apuntes',
  templateUrl: './todos-apuntes.component.html',
  styleUrls: ['./todos-apuntes.component.css']
})
export class TodosApuntesComponent implements OnInit {
  apuntes:Apunte[] = [];
  itemsPerPage = 2;
  sortBy = "titulo,desc";
  paginacion: Paginacion = {
    pagina: 0,
    itemsPerPage: this.itemsPerPage,
    totalElements: 0,
    totalPages: 0,
    sortBy: this.sortBy
  };
  formBuscar:FormGroup;

  constructor(
    private apunteService: ApunteService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.buscarForm();
    this.getTodosInicio();
  }

  buscarForm(){
    this.formBuscar = this.fb.group({
      buscarPor: new FormControl(''),
      buscar: new FormControl(''),
    });
  }

  enviarForm(){
    this.paginacion = {
      pagina: 0,
      itemsPerPage: this.itemsPerPage,
      totalElements: 0,
      totalPages: 0,
      sortBy: this.sortBy
    };

    const body: ApuntesTodosBusqueda = {
      buscarPor: this.formBuscar.value.buscarPor,
      buscar: this.formBuscar.value.buscar,
      page: this.paginacion.pagina,
      size: this.paginacion.itemsPerPage,
      sortBy: this.sortBy
    };

    this.getTodosBusqueda(body);
  }

  paginaPag(value: number){
    if(value < this.paginacion.totalPages){
      this.paginacion.pagina = value;
      this.datosPaginados();
    }
  }

  datosPaginados(){
    const body: ApuntesTodosBusqueda = {
      buscarPor: this.formBuscar.value.buscarPor,
      buscar: this.formBuscar.value.buscar,
      page: this.paginacion.pagina,
      size: this.paginacion.itemsPerPage,
      sortBy: this.sortBy
    };
    this.getTodosBusqueda(body);
  }

  getTodosInicio(){
    this.paginacion = {
      pagina: 0,
      itemsPerPage: this.itemsPerPage,
      totalElements: 0,
      totalPages: 0,
      sortBy: this.sortBy
    };

    const body: ApuntesTodosBusqueda = {
      buscarPor: this.formBuscar.value.buscarPor,
      buscar: this.formBuscar.value.buscar,
      page: this.paginacion.pagina,
      size: this.paginacion.itemsPerPage,
      sortBy: this.sortBy
    };

    this.getTodosBusqueda(body);
  }

  getTodosBusqueda(body:ApuntesTodosBusqueda){
    this.apunteService.getBusqueda(body).subscribe((res: any) =>{
      this.apuntes = res.content;
      this.paginacion = {
        pagina: res.number,
        itemsPerPage: this.itemsPerPage,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        sortBy: this.sortBy
      };
    },((error : ErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage
        });
    }));
  }

  queryParams(page:number, size:number, sortBy:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("size",size);
    queryParams = queryParams.append("sortBy",sortBy);
    return queryParams;
  }

  eliminarApunte(indice: number){
    const idApunte = this.apuntes[indice]["idApunte"] as number;

    Swal.fire({
      title: 'Estás seguro de eliminar?',
      text: "No podras revertir la situación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apunteService.eliminarApunte(idApunte).subscribe(res => {
          this.apuntes.splice(indice, 1);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        });
      }
    })
  }

  limpiar(){
    this.formBuscar.controls["buscarPor"].setValue("");
    this.formBuscar.controls["buscar"].setValue("");
    this.getTodosInicio();
  }
}
