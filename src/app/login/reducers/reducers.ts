import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.states';
import { usuarioReducer } from './usuario.reducer';

export const reducers: ActionReducerMap<AppState> = {
  usuarioState: usuarioReducer
};