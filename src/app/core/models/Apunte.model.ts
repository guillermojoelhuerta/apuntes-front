import { Categoria } from "./Categoria.model";

export interface Apunte{
    idApunte?:number,
    id_categoria:number,
    titulo:string;
    contenido:string,
    categoria?:Categoria,
    archivo_usuario?:any,
    id_usuario:number,
}                                                                       