import { Usuario } from '../models/usuario';

export interface AppState {
	usuarioState: UsuarioState;
}

export interface UsuarioState {
	usuarios: Usuario[];
}