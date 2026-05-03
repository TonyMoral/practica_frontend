import {Usuario} from "./user.model";

export interface ImagenUsuario {
    id: number;

    usuario: Usuario;

    imagen: string;
}