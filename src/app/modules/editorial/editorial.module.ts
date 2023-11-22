import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { EditorialRoutingModule } from './editorial-routing.module';
import { RegistrareditorialComponent } from './page/registrareditorial/registrareditorial.component';
import { EditorialComponent } from './page/editorial/editorial.component';
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
    EditorialComponent,
    RegistrareditorialComponent
  ],
  imports: [
    CommonModule,
    EditorialRoutingModule,
    
    
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
export class EditorialModule { }
