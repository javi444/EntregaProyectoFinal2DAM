import { Addcentro } from './../../dto/add-centro.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CentroService } from 'src/app/service/centro.service';

@Component({
  selector: 'app-add-centro',
  templateUrl: './add-centro.component.html',
  styleUrls: ['./add-centro.component.scss']
})
export class AddCentroComponent implements OnInit {
  createCentro: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCentroComponent>, public snackBar: MatSnackBar, private centroService: CentroService) { }

  ngOnInit() {
    this.createCentro = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      descripcion: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required])
    });

  }

  addCentro() {

    const addCentroComponentDto = <Addcentro>this.createCentro.value;

    this.centroService.addCentro(addCentroComponentDto).subscribe(centro => {
      this.dialogRef.close();

    }, error => {
      console.log(error);
    })
  }

}
