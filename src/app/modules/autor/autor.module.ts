import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutorComponent } from './pages/autor/autor.component';
import { RegistrarautorComponent } from './pages/registrarautor/registrarautor.component';



@NgModule({
  declarations: [
    AutorComponent,
    RegistrarautorComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    
    
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
export class AutorModule { }
