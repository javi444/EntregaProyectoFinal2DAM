import { Usuario } from "./usuario.interface";

export interface SigninResponse{
    token: string;
    user: Usuario
}