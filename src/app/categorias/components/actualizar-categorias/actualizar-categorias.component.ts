import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '@app/shared/services/categorias.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Categoria } from '@app/core/models/Categoria.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-categorias',
  templateUrl: './actualizar-categorias.component.html',
  styleUrls: ['./actualizar-categorias.component.css']
})
export class ActualizarCategoriasComponent implements OnInit {
  actualizarCategoria:UntypedFormGroup = new UntypedFormGroup({
    id_categoria: new UntypedFormControl(''),
    nombre: new UntypedFormControl('', [Validators.required]),
    descripcion: new UntypedFormControl('', [Validators.required]),
    activo: new UntypedFormControl('', [Validators.required])
  });
  id: number = 0;
  constructor(
    private categoriasService: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params["id"];
    });

    this.categoriasService.getCategoriasById(this.id).subscribe((res : Categoria) => {
      this.actualizarCategoria.setValue(res);
    });
  }

  enviarCategoria(){
    this.categoriasService.updateCategoria(this.actualizarCategoria.value).subscribe((res : Categoria) => {
      this.actualizarCategoria.markAsPristine();
      this.actualizarCategoria.markAsUntouched();
      Swal.fire(
        {
          icon: 'success',
          title: 'Actualización completa!!'
        }
      );
    });
  }
}
