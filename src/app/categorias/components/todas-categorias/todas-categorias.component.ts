import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CategoriasService } from '@app/shared/services/categorias.service';
import { Categoria } from '@app/core/models/Categoria.model';
import { Paginacion } from '@app/core/models/Paginacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todas-categorias',
  templateUrl: './todas-categorias.component.html',
  styleUrls: ['./todas-categorias.component.css']
})
export class TodasCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  itemsPerPage = 5;
  sortBy = "id_categoria,asc";
  paginacion: Paginacion = {
    pagina: 0,
    itemsPerPage: this.itemsPerPage,
    totalElements: 0,
    totalPages: 0,
    sortBy: this.sortBy
  };
  constructor(private categoriasService: CategoriasService) {
  }

  ngOnInit(): void {
    this.datosPaginados();
  }

  paginaPag(value: number){
    if(value < this.paginacion.totalPages){
      this.paginacion.pagina = value;
      this.datosPaginados();
    }
  }

  datosPaginados(){
    const queryParams = this.queryParams(
      this.paginacion.pagina,
      this.paginacion.itemsPerPage,
      this.sortBy
    );

    this.categoriasService.getCategorias(queryParams).subscribe((res: any) =>{
      this.categorias = res.content;
      this.paginacion = {
        pagina: res.number,
        itemsPerPage: this.itemsPerPage,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        sortBy: this.sortBy
      }
    });
  }

  queryParams(page:number, size:number, sortBy:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("size",size);
    queryParams = queryParams.append("sortBy",sortBy);
    return queryParams;
  }

  eliminarCategoria(indice : number, categoria : Categoria){
    const id_categoria =  this.categorias[indice]["id_categoria"] as number;
    const nombre_categoria = this.categorias[indice]["nombre"];

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
          this.categoriasService.deleteCategoria(id_categoria).subscribe(res => {
            this.categorias.splice(indice, 1);
            Swal.fire(
              'Deleted!',
              'El registro ha sido eliminado.',
              'success'
            );
          });
        }
      })
  }
}
