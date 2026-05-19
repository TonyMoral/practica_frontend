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

}
