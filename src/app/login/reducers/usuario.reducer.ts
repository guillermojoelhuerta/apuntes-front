import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../actions/usuario.actions';
import { Usuario } from '../models/usuario';

export const initialState: Usuario = {
  id_usuario: 0,
	nombre: '',
  rol: ''
};

const _usuarioReducer = createReducer(
  initialState,
  on(fromActions.idUsuarioAction, (state, {id_usuario}) => {
    return {...state, id_usuario};
  }),
  on(fromActions.nombreUsuarioAction, (state, {nombre}) => {
    return {...state, nombre};
  }),
  on(fromActions.rolUsuarioAction, (state, {rol}) => {
    return {...state, rol};
  }),
  on(fromActions.asignarUsuarioAction, (state, {usuario}) => {
    return {...state, usuario};
  })
);

export function usuarioReducer(state: any, action: Action) {
  return _usuarioReducer(state, action);
}
