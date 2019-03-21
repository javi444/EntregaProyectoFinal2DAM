import { Centro } from './../../interfaces/centro.interface';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CentroService } from 'src/app/service/centro.service';

@Component({
  selector: 'app-editar-centro',
  templateUrl: './editar-centro.component.html',
  styleUrls: ['./editar-centro.component.scss']
})
export class EditarCentroComponent implements OnInit {
  editarCentro: FormGroup;

  id: string;
  nombre: string;
  descripcion: string;
  direccion: string;

  constructor(public snackBar: MatSnackBar, private centroService: CentroService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditarCentroComponent>) { }

  ngOnInit() {
    this.id = this.data.element.id;
    this.nombre = this.data.element.nombre;
    this.descripcion = this.data.element.descripcion;
    this.direccion = this.data.element.direccion;

    this.editarCentro = new FormGroup({
      nombre: new FormControl(this.nombre, [Validators.required]),
      descripcion: new FormControl(this.descripcion, [Validators.required]),
      direccion: new FormControl(this.direccion, [Validators.required]),
      imagen: new FormControl(this.data.element.imagen)
      
    });
  }

  editOnecentro() {
    const centroDto = <Centro>this.editarCentro.value;

    this.centroService.editOneCentro(this.id, centroDto).subscribe(centroEdited => {

      console.log(centroEdited);
      this.dialogRef.close();

    }, error =>{
      console.log(error);

    })
  }

}
