import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../core/services/categorias.service';
import { Categoria } from '../../../core/models/Categoria.model';
      
@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrls: ['./crear-categorias.component.css']
})
export class CrearCategoriasComponent implements OnInit {
  crearCategoria:UntypedFormGroup = new UntypedFormGroup({
    nombre: new UntypedFormControl('', [Validators.required]),
    descripcion: new UntypedFormControl('', [Validators.required])
  });     

  constructor(
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {              
  }

  enviarCategoria(){      
    let cat : Categoria = {
      nombre: this.crearCategoria.value.nombre,
      descripcion: this.crearCategoria.value.descripcion,
      activo: true      
    }                                   
    this.categoriasService.postCategoria(cat).subscribe((res: Categoria) =>{             
      this.crearCategoria.reset();
    });                
  }       

}
