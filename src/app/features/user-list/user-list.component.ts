import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { UserService } from 'src/app/core/services/user.service';
import { Usuario } from 'src/app/core/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule, UserPopupComponent, FormsModule]
})
export class UserListComponent implements OnInit {
  @Output() cerrarPopUpOk = new EventEmitter<void>();
  @Output() cerrarPopUpCancel = new EventEmitter<void>();

  modoPopup: string = 'CLOSED';
  estadoPopup: string = 'CREAR';
  usuarios: Usuario[] = [];
  selectedUserId: number = 0;



  constructor(private router: Router, private userService: UserService) {
    this.userService = userService;
  }

  async ngOnInit() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
    } else {
      console.log("user is logged in");
      this.usuarios = await this.userService.obtenerUsuarios();
      console.log(this.usuarios);
      this.selectedUserId = this.usuarios[0]?.id || 0;

    }

  }
  nombreCompleto(usuario: Usuario): string {
    return `${usuario.nombre} ${usuario.primerApellido} ${usuario.segundoApellido}`;
  }


  onCerrarPopUpOk() {
    this.modoPopup = 'CLOSED';
  }

  onCerrarPopUpCancel() {
    this.modoPopup = 'CLOSED';
  }

  launchPopup() {

    this.modoPopup = 'LAUNCH';
  }

  launchPopupUpdate() {
    this.estadoPopup = 'ACTUALIZAR';
    this.modoPopup = 'LAUNCH';

  }

  launchPopupCreate() {
    this.estadoPopup = 'CREAR';
    this.modoPopup = 'LAUNCH';

  }

  getDireccionPrincipal(usuario: Usuario): string {
    if (!Array.isArray(usuario.direcciones) || usuario.direcciones.length === 0) {
      return '-';
    }
    const direccionPrincipal = (usuario.direcciones as any[]).find(direccion => direccion.direccionPrincipal);
    if (direccionPrincipal) {
      return `${direccionPrincipal.nombreCalle} ${direccionPrincipal.numeroCalle}`;
    } else {
      return '-';
    }
    }

    getDireccionesExtra(usuario: Usuario): number {
      if (!usuario.direcciones || usuario.direcciones.length === 0) {
        return 0;
}
      const tienePrincipal = (usuario.direcciones as any[]).some(direccion => direccion.direccionPrincipal);
      return usuario.direcciones.length - (tienePrincipal ? 1 : 0);
    }



  // @TODO: Implementar propiedades, atributos, métodos... necesarios para el funcionamiento del listado de usuarios

}

