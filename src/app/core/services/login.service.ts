import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import to from "./utils.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  async iniciarSesion(nickUsuario: string, contrasena: string) {
    return await to(
        this.http
            .post<boolean>('http://localhost:8080/api/login',
                null, { params: { nickUsuario: nickUsuario, contrasena: contrasena } })
            .toPromise()
    )
  }



}
