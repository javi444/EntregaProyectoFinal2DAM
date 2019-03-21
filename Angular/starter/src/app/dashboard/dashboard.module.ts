import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCentroComponent } from './delete-centro/delete-centro.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule, MatSnackBarModule, MatDialogModule, MatOptionModule, MatSelect, MatSelectModule, MatInputModule, MatFormFieldModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { EditarCentroComponent } from './editar-centro/editar-centro.component';
import { ListaPistasComponent } from './lista-pistas/lista-pistas.component';
import { AddPistaComponent } from './add-pista/add-pista.component';
import { DeletePistaComponent } from './delete-pista/delete-pista.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule
  ],
  declarations: [ DashboardComponent, DeleteCentroComponent, ListaPistasComponent, AddPistaComponent, DeletePistaComponent, AddPistaComponent ],
  entryComponents: [ DeleteCentroComponent, DeletePistaComponent, AddPistaComponent ]
})

export class DashboardModule {}
