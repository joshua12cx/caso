import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { RegistrarcategoriaComponent } from './pages/registrarcategoria/registrarcategoria.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriaComponent,
    RegistrarcategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriaModule { }
