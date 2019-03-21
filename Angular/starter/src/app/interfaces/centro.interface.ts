import { Pista } from "./pista.interface";

export interface Centro{
    id: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    pistas: Pista;
    imagen: string;
    /* imagenes: Foto;
    pistas: Pista; */
}