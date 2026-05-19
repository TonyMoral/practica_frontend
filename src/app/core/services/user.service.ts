import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/user.model';
import to from "./utils.service";
import ConstUrls from 'src/app/shared/contants/const-urls';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  async obtenerUsuarioPorId(id: number) {
    return await to(
        this.http
            .get<Usuario>(`${ConstUrls.API_URL}/usuarios/${id}}`)
            .toPromise()
    )
  }

  async obtenerUsuarios() {
    return await to(
        this.http
            .get<Usuario[]>(`${ConstUrls.API_URL}/usuarios`)
            .toPromise()
    )
  }

  async obtenerGeneros() {
    return await to(
        this.http
            .get<any[]>(`${ConstUrls.API_URL}/generos`)
            .toPromise()
    )
  }

  async obtenerPuestosDeTrabajo() {
    return await to(
        this.http
            .get<any[]>(`${ConstUrls.API_URL}/puestos-de-trabajo`)
            .toPromise()
    )
  }

  async crearUsuario(usuario: Usuario) {
    return await to(
        this.http
            .post<Usuario>(`${ConstUrls.API_URL}/usuarios`, usuario)
            .toPromise()
    )
  }


  async actualizarUsuario(usuario: Usuario) {
    return await to(
        this.http
            .put<Usuario>(`${ConstUrls.API_URL}/usuarios/${usuario.id}`, usuario)
            .toPromise()
    )
  }

  async eliminarUsuario(id: number) {
    return await to(
        this.http
            .delete<boolean>(`${ConstUrls.API_URL}/usuarios/${id}`)
            .toPromise()
    )
  }


}
