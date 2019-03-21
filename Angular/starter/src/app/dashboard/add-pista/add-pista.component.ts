import { CentroService } from './../../service/centro.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { PistaService } from 'src/app/service/pista.service';
import { Addpista } from 'src/app/dto/add-pista.dto';
import { Centro } from 'src/app/interfaces/centro.interface';

@Component({
  selector: 'app-add-pista',
  templateUrl: './add-pista.component.html',
  styleUrls: ['./add-pista.component.scss']
})
export class AddPistaComponent implements OnInit {
  createPista: FormGroup;
  arrayCentros: Centro[];
  idCentro: FormControl;

  constructor(public dialogRef: MatDialogRef<AddPistaComponent>, public snackBar: MatSnackBar, private pistaService: PistaService, private centroService: CentroService) { }

  ngOnInit() {
    this.idCentro = new FormControl("", [Validators.required]);
    this.createPista = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      cubierta: new FormControl("", [Validators.required]),
      precio: new FormControl("", [Validators.required])
    });
    this.getListaCentros();
  }

  addPista() {
    console.log("centro:"+this.idCentro.value);
    const addPistaComponentDto = <Addpista>this.createPista.value;

    this.pistaService.addPista(this.idCentro.value, addPistaComponentDto).subscribe(pista => {
      this.dialogRef.close();

    }, error => {
      console.log(error);
    })
  }

  getListaCentros() {

    this.centroService.getAllcentros().subscribe(listaCentros => {
      console.log(listaCentros);
      this.arrayCentros = listaCentros;

      /* this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      }); */
    }, error => {
      console.log(error);
      this.snackBar.open('Error al obtener centros', 'Cerrar', {
        duration: 3000,
      });
    });

  }

}
