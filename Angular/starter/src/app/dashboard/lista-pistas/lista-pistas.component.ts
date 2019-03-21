import { Pista } from './../../interfaces/pista.interface';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { PistaService } from 'src/app/service/pista.service';
import { Router } from '@angular/router';
import { DeletePistaComponent } from '../delete-pista/delete-pista.component';
import { AddPistaComponent } from '../add-pista/add-pista.component';

@Component({
  selector: 'app-lista-pistas',
  templateUrl: './lista-pistas.component.html',
  styleUrls: ['./lista-pistas.component.scss']
})
export class ListaPistasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'cubierta', 'precio', 'acciones'];
  dataSource: Pista[]; 

  constructor(private pistaService: PistaService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.getListaPistas('Listado de pistas cargado');
    if(localStorage.getItem('token')==null){
      this.router.navigate(['']);
    }
  }

  getListaPistas(mensaje: string) {
    this.pistaService.getAllPistas().subscribe(listaPistas => {
      console.log(listaPistas);
      this.dataSource = listaPistas['rows'];

      /* this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      }); */
    }, error => {
      console.log(error);
      this.snackBar.open('Error al obtener pistas', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  openDialogDeletePista(pista: Pista) {
    const dialogDeletePista = this.dialog.open(
      DeletePistaComponent,
      {
        height: "33%",
        data: {
          element: pista
        }
      }
    );
    dialogDeletePista.afterClosed().subscribe(
      response => {
        this.getListaPistas("");
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialogNuevaPista() {
    const dialogAddPista = this.dialog.open(
      AddPistaComponent,
      {
        height: "82%"
      },
    );
    dialogAddPista.afterClosed().subscribe(
      response => {
        this.getListaPistas('');
      },
      error => {
        console.log(error);
      }
    );
  }

}
