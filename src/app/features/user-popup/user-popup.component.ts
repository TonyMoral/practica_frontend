import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.css'],
    standalone: true,
    imports: [ CommonModule ]
})
export class UserPopupComponent implements OnInit {

    @Output() cerrarPopUpOk = new EventEmitter<void>();
    @Output() cerrarPopUpCancel = new EventEmitter<void>();

    @Input() estadoPopup: string = 'CREAR';
    @Input() userId: number = 0;


    constructor() {

    }

    async ngOnInit() {
    }

    async onSave() {
        console.log('Save button clicked');
        console.log('nickUsuario:', localStorage.getItem('nickUsuario'));
        console.log('contrasena:', localStorage.getItem('contrasena'));
        if (this.estadoPopup === 'CREAR')
            console.log('estadoPopup:', this.estadoPopup);
        else
            console.log('estadoPopup:', this.estadoPopup);
        console.log('userId:', this.userId);

        this.cerrarPopUpOk.emit();
    }
    onCancel() {
        this.cerrarPopUpCancel.emit();

    }
}
