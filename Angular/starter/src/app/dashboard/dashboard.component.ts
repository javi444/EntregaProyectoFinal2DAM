import { Component, OnInit } from '@angular/core';
import { Centro } from '../interfaces/centro.interface';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { CentroService } from '../service/centro.service';
import { Router } from '@angular/router';
import { DeleteCentroComponent } from './delete-centro/delete-centro.component';
import { AddCentroComponent } from './add-centro/add-centro.component';
import { EditarCentroComponent } from './editar-centro/editar-centro.component';

//const ELEMENT_DATA: Centro[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'direccion'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  arrayCentros: Centro[];

  constructor(private centroService: CentroService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit() {
    this.getListaCentros('Listado de centros cargado');
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['']);
    }
    console.log(this.getListaCentros("s"));
  }

  getListaCentros(mensaje: string) {
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

  openDialogDeleteCentro(centro: Centro) {
    const dialogDeleteCentro = this.dialog.open(
      DeleteCentroComponent,
      {
        height: "33%",
        data: {
          element: centro
        }
      }
    );
    dialogDeleteCentro.afterClosed().subscribe(
      response => {
        this.getListaCentros("");
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialogAddCentro() {
    const dialogAddCentro = this.dialog.open(
      AddCentroComponent,
      {
        height: "82%"
      }
    );
    dialogAddCentro.afterClosed().subscribe(
      response => {
        this.getListaCentros('');
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialogEditarCentro(centro: Centro) {
    const dialogEditarCentro = this.dialog.open(
      EditarCentroComponent,
      {
        width: '50%',
        height: "88%",
        data: {
          element: centro
        }
      }
    );
    dialogEditarCentro.afterClosed().subscribe(
      response => {
        this.getListaCentros('');
      },
      error => {
        console.log(error);
      }
    );
  }
}
