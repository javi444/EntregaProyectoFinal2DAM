import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CentroService } from 'src/app/service/centro.service';

@Component({
  selector: 'app-delete-centro',
  templateUrl: './delete-centro.component.html',
  styleUrls: ['./delete-centro.component.scss']
})
export class DeleteCentroComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteCentroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private centroService: CentroService) { }

    name = this.data.element.name;
    palabraBorrar: string;

  ngOnInit() {
  }

  deleteCentro() {
    this.centroService
      .deleteOneCentro(this.data.element.id)
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


