import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '@app/shared/services/categorias.service';
import { Categoria } from '@app/core/models/Categoria.model';
import { ApunteService } from '@app/shared/services/apunte.service';
import { Apunte } from '@app/core/models/Apunte.model';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';
import { StorageService } from '@app/shared/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-apunte',
  templateUrl: './crear-apunte.component.html',
  styleUrls: ['./crear-apunte.component.css']
})
export class CrearApunteComponent implements OnInit {
  todosCreate:UntypedFormGroup = new UntypedFormGroup({
    id_categoria: new UntypedFormControl('', [Validators.required]),
    titulo: new UntypedFormControl('', [Validators.required]),
    contenido: new UntypedFormControl('', [Validators.required]),
  });
  catCategorias : Categoria[] = [];
  images: File[] = [];
  image: File;
  files: File[] = [];
  file: File;
  @ViewChild('imageInput', {static: false})
  imageInput: ElementRef;
  @ViewChild('fileInput', {static: false})
  fileInput: ElementRef;

  constructor(
    private categoriaService : CategoriasService,
    private apunteService: ApunteService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.categoriaService.getCategoriasList().subscribe((res: Categoria[]) => {
      this.catCategorias = res;
    });
  }

  enviar(){

    let id_usuario = Number(this.storage.getKey('id_usuario'));

    /*
    let apunte : Apunte = {
      id_categoria: this.todosCreate.value.id_categoria,
      titulo: this.todosCreate.value.titulo,
      contenido:this.todosCreate.value.contenido,
      id_usuario: id_usuario
    };*/
    let apunte : Apunte = {
      id_categoria: this.todosCreate.value.id_categoria,
      titulo:'',
      contenido:'',
      id_usuario: id_usuario
    };

    let formData = new FormData();

    this.images.forEach((image:File) => {
      formData.append("images", image);
    });
    this.files.forEach((file:File) => {
      formData.append("files", file);
    });
    formData.append("apunte", JSON.stringify(apunte));
    this.apunteService.crearApunte(formData).subscribe((res: Apunte) => {
        console.log("crearApunte", res);
        this.images = [];
        this.files = [];
        Swal.fire(
          {
            icon: 'success',
            title: 'Se ha registrado exitosamente!!'
          }
        );
        this.todosCreate.reset();
        this.todosCreate.controls['id_categoria'].setValue('');
        this.imageInput.nativeElement.value = '';
        this.fileInput.nativeElement.value = '';
    },((error: ErrorResponse)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage
      });
    }));
  }

  imageChangeEvent(event: any){
    this.images = [];
    for(let x = 0; x < event.target.files.length; x++){
      this.images.push(event.target.files[x]);
    }
  }

  fileChangeEvent(event: any){
    this.files = [];
    for(let x = 0; x < event.target.files.length; x++){
      this.files.push(event.target.files[x]);
    }
  }
}
