import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Usuario, usuarioInicial } from "src/app/core/models/user.model";
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule],
    providers: [DatePipe]
})
export class UserPopupComponent implements OnInit {

    @Output() cerrarPopUpOk = new EventEmitter<void>();
    @Output() cerrarPopUpCancel = new EventEmitter<void>();

    @Input() estadoPopup: string = 'CREAR';
    @Input() userId: number = 0;

    usuarioActual: Usuario = JSON.parse(JSON.stringify(usuarioInicial));

    generosDisponibles: any[] = [];
    puestosDisponibles: any[] = [];

    direccionSeleccionadaIndex: number = -1;
    indiceDireccionEditando: number = -1;
    fechaCreacionFormateada: string = '';



    constructor(private userService: UserService, private datePipe: DatePipe) {

    }

    async ngOnInit() {
        await this.cargarCatalogos();
        if (this.estadoPopup === 'CREAR') {
            // Inicializamos objetos vacios si no existen
            if (!this.usuarioActual.genero) this.usuarioActual.genero = { id: 0, nombre: '' };
            if (!this.usuarioActual.puestoTrabajo) this.usuarioActual.puestoTrabajo = { id: 0, nombre: '' };
            this.usuarioActual.direcciones = [];

            // Establecemos la fecha de creacion a hoy
            const hoy = new Date();
            this.fechaCreacionFormateada = this.datePipe.transform(hoy, 'yyyy-MM-dd HH:mm') || '';

        } else if (this.estadoPopup === 'ACTUALIZAR' && this.userId > 0) {
            // EJERCICIO 4 ACTUALIZAR!!!!!!!

        }
    }

    async cargarCatalogos() {
        this.generosDisponibles = await this.userService.obtenerGeneros() || [];
        this.puestosDisponibles = await this.userService.obtenerPuestosDeTrabajo() || [];

    }

    crearDireccionVacia() {
        if (!this.usuarioActual.direcciones) {
            this.usuarioActual.direcciones = [];
        }
        const nuevaDireccion = {
            id: null,
            nombreCalle: '',
            numeroCalle: 0,
            direccionPrincipal: false,
        };
        this.usuarioActual.direcciones.push(nuevaDireccion);

        // Al crear una nueva direccion se pone en editar directamente
        this.indiceDireccionEditando = this.usuarioActual.direcciones.length - 1;

    }

    actualizarDireccion() {
        if (this.direccionSeleccionadaIndex > -1) {
            this.indiceDireccionEditando = this.direccionSeleccionadaIndex;
        }

    }

    eliminarDireccion() {
        if (this.indiceDireccionEditando > -1) {
            this.usuarioActual.direcciones.splice(this.direccionSeleccionadaIndex, 1);
            this.direccionSeleccionadaIndex = -1;
            this.indiceDireccionEditando = -1;
        }


    }

    marcarComoPrincipal(index: number) {
        this.usuarioActual.direcciones.forEach(d => d.direccionPrincipal = false);
        this.usuarioActual.direcciones[index].direccionPrincipal = true;

    }



async onSave() {
    console.log('Save button clicked. Preparando datos...');

    const datosParaBackend: any = {
      ...this.usuarioActual,
      generoId: this.usuarioActual.genero ? this.usuarioActual.genero.id : null,
      puestoDeTrabajoId: this.usuarioActual.puestoTrabajo ? this.usuarioActual.puestoTrabajo.id : null
    };

    if (this.estadoPopup === 'CREAR') {
      try {
        // Hacemos la petición
        await this.userService.crearUsuario(datosParaBackend);
        
        // Si llega a esta línea, es que el backend devolvió un 200 OK (Éxito)
        alert('¡Usuario guardado con éxito!');
        
        // Esto le grita al padre: "¡Ciérrame y actualiza!"
        this.cerrarPopUpOk.emit(); 
        
      } catch (error) {
        // Si el backend da un error 400 o 500, caerá aquí
        alert('Error al guardar en la base de datos.');
        console.error('Error detallado:', error);
      }
    } else {
      // MODO ACTUALIZAR (Ejercicio 4)
      try {
        await this.userService.actualizarUsuario(datosParaBackend);
        alert('¡Usuario actualizado con éxito!');
        this.cerrarPopUpOk.emit();
      } catch (error) {
        alert('Error al actualizar.');
        console.error(error);
      }
    }
  }

    onCancel() {
        this.cerrarPopUpCancel.emit();

    }
}
