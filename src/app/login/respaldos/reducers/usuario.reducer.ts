import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../actions/usuario.actions';
import { JAVA_ARTICLES, ANGULAR_ARTICLES } from '../models/usuario';
import { UsuarioState } from './app.states';
                                
export const initialState: UsuarioState = { usuarios: []};

const _usuarioReducer = createReducer(
  initialState,
  on(fromActions.JavaArticlesAction, (state) => { return {usuarios: JAVA_ARTICLES};}),
  on(fromActions.AngularArticlesAction, (state) => { return {usuarios: ANGULAR_ARTICLES};}),
  on(fromActions.FavoriteArticlesAction, (state, {payload}) => {return {usuarios: payload};}),
);

export function usuarioReducer(state: any, action: Action) {
  return _usuarioReducer(state, action);
}


export const initialState2 =  "dfsdfdfdss";

const _usuarioNameReducer = createReducer(
  initialState2,
  on(fromActions.nombreAction, (state, {nombre}) => {
    return nombre;
  })
);

export function usuarioNameReducer(state: any, action: Action) {
  return _usuarioNameReducer(state, action);
}

export const getUsuarioState = createFeatureSelector<UsuarioState>('usuarioState');

export const getUsuarios = createSelector(
    getUsuarioState, 
    (state: UsuarioState) => state.usuarios 
);