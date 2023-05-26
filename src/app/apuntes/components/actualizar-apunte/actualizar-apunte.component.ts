import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { Apunte } from 'src/app/core/models/Apunte.model'; 
import { Categoria } from 'src/app/core/models/Categoria.model';
import { ArchivoUsuario } from 'src/app/core/models/ArchivoUsuario.model';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { Constants } from 'src/app/core/constants/constants';
import { mergeMap } from 'rxjs/operators';    
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';   
import { environment } from '../../../../environments/environment';
import { OrdenamientoService } from 'src/app/core/components/ordenamiento/ordenamiento.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-actualizar-apunte',
  templateUrl: './actualizar-apunte.component.html',
  styleUrls: ['./actualizar-apunte.component.css']
})
export class ActualizarApunteComponent implements OnInit {
  apunteActualizar:UntypedFormGroup = new UntypedFormGroup({              
    idApunte: new UntypedFormControl('', [Validators.required]),
    id_categoria: new UntypedFormControl('', [Validators.required]),
    titulo: new UntypedFormControl('', [Validators.required]),
    contenido: new UntypedFormControl('', [Validators.required]),
    activo: new UntypedFormControl('', [Validators.required]),
    categoria: new UntypedFormControl(''),
    archivo_usuario: new UntypedFormControl(''),
    id_usuario: new UntypedFormControl('')      
  });                              
  catCategorias : Categoria[] = [];
  id: number = 0;
  archivo_usuario: ArchivoUsuario[] = [];
  images: File[] = [];
  image: File;    
  files: File[] = [];
  file: File;             
  @ViewChild('imageInput', {static: false})
  imageInput: ElementRef;	    
  @ViewChild('fileInput', {static: false})
  fileInput: ElementRef;	    
  url = `${environment.url_api}/uploads/`;     
  typeFile = Constants.TypeFile;

  constructor(
    private apunteService : ApunteService,
    private categoriaService: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordenamientoService: OrdenamientoService
  ) { }

  ngOnInit(): void {  

    this.activatedRoute.params.subscribe((params : Params) => {
      this.id = params["id"];
    });

    this.categoriaService.getCategoriasList()
    .pipe(
      mergeMap((res:Categoria[]) => {     
        this.catCategorias = res;
        return this.apunteService.getById(this.id)
      })          
    ).subscribe((res2:Apunte) => {   
        this.apunteActualizar.setValue(res2);
        if(res2["archivo_usuario"]){
          this.archivo_usuario = this.ordenamientoService.sortArrObj(
            res2["archivo_usuario"], 
            "idTypeFile", 
            "asc"             
          );                        
        }                                                           
    },(error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage
        })
    });                         
  }

  enviar(){          
    let apunte : Apunte =  this.apunteActualizar.value;              
    let formData = new FormData();
          
    this.images.forEach((image:File) => {
      formData.append("images", image);
    });   
    this.files.forEach((file:File) => {
      formData.append("files", file);
    });                           
    formData.append("apunte", JSON.stringify(apunte))     
    this.apunteService.update(formData).subscribe((res: Apunte) => {    
      if(res["archivo_usuario"]){           
        this.archivo_usuario = this.ordenamientoService.sortArrObj(
          res["archivo_usuario"], 
          "idTypeFile", 
          "asc"       
        );                  
      }                                            
      this.imageInput.nativeElement.value = '';
      this.fileInput.nativeElement.value = '';
      this.images = [];  
      this.files = [];                      
      this.apunteActualizar.markAsPristine();           
      this.apunteActualizar.markAsUntouched();      

      Swal.fire(
        {
          icon: 'success',
          title: 'Actualización completa!!'
        }           
      );      
    });
  }           
          
  deleteFile(archivo_usuario: ArchivoUsuario){ 
    Swal.fire({
      title: 'Estas seguro de querer eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,      
    }).then((result) => {
      if (result.isConfirmed) {
        this.apunteService.eliminarArchivo(archivo_usuario).subscribe(res => 
        {       
          const result = this.archivo_usuario.findIndex( item =>{
            return item["id_archivo_usuario"] === archivo_usuario.id_archivo_usuario;
          });             
          this.archivo_usuario.splice(result,1);
        });

      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }       
    });
  }

  imageChangeEvent(event: any) {     
    this.images = [];              
    for(let x = 0; x < event.target.files.length; x++){
      this.images.push(event.target.files[x]);
    }              
  }           
  fileChangeEvent(event: any) {     
    this.files = [];              
    for(let x = 0; x < event.target.files.length; x++){
      this.files.push(event.target.files[x]);
    }                     
  }  
  descargar(carpeta: string, filename : string){ 
    const body = { "carpeta": carpeta, "filename": filename };                
    this.apunteService.downloadFile(body).subscribe();
  }                                              
}
