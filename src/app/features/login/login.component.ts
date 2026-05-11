import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import ConstLocalStorage from 'src/app/shared/contants/const-local-storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: []
})
export class LoginComponent {

  LoginService: LoginService;

  constructor(private router: Router, private loginService: LoginService) {
    this.LoginService = loginService;
  }

  public iniciarSesion() {
    console.log('Iniciar sesión');}

  // @TODO: Implementar métodos, atributos, etc. necesarios para el funcionamiento del login
}
