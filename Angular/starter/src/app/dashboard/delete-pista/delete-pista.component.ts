import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PistaService } from 'src/app/service/pista.service';

@Component({
  selector: 'app-delete-pista',
  templateUrl: './delete-pista.component.html',
  styleUrls: ['./delete-pista.component.scss']
})
export class DeletePistaComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeletePistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pistaService: PistaService) { }

    //name = this.data.element.name;
    palabraBorrar: string;

  ngOnInit() {
  }

  deletePista() {
    this.pistaService
      .deleteOnePista(this.data.element.id)
      .subscribe(
        resp => {
          this.dialogRef.close();
        },
        error => {
          console.log(error);
        }
      );
  }

  validarDelete(): boolean {
    let validar = true;

    if (this.palabraBorrar != "ELIMINAR") {
      validar = false;
    }
    return validar;
  }

}
