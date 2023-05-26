import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario';
                                
export const idUsuarioAction = createAction('[ Asignar usuario ] Asignar id', props<{ id_usuario: number}>());                 
export const nombreUsuarioAction = createAction('[ Asignar usuario ] Asignar nombre', props<{ nombre: string }>());
export const rolUsuarioAction = createAction('[ Asignar usuario ] Asignar rol', props<{ rol: string }>());  
export const asignarUsuarioAction =  createAction('[ Asignar usuario ] Asignar usuario', props<{usuario: Usuario }>());               