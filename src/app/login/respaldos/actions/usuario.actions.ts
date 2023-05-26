import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario';

export const JavaArticlesAction = createAction('[ Usuario ] Java');
export const AngularArticlesAction = createAction('[ Usuario ] Angular');
export const FavoriteArticlesAction = 
        createAction('[ Usuario ] Favorite_Articles', props<{ payload: Usuario[] }>());
export const nombreAction =             
        createAction('[ Usuario2 ] Asignar nombre', props<{ nombre: string }>());                 