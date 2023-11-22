import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/core/models/categoria.models';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-registrarcategoria',
  templateUrl: './registrarcategoria.component.html',
  styleUrls: ['./registrarcategoria.component.css']
})
export class RegistrarcategoriaComponent implements OnInit {
  usuario: Categoria;
  formGroup: FormGroup = new FormGroup({});
  categoria: Categoria;
  editingMode = false;

  datosGuardatos: Categoria[];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private CategoriaService: CategoriaService, // Corregido el nombre del servicio
    public dialogRef: MatDialogRef<RegistrarcategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria }
  ) {
    this.categoria = data.categoria;
    this.editingMode = !!this.categoria;
  }

  ngOnInit(): void {
    this.inithiliazerInputs();
  }

  public inithiliazerInputs() {
    this.usuario = new Categoria();
    this.formGroup = new FormGroup({
      idcategoria: new FormControl(this.usuario.idcategoria), // Cambiado a idautor
      categoria: new FormControl(this.usuario.categoria, [Validators.required]),
    });

    if (this.editingMode) {
      this.formGroup.setValue({
        idcategoria: this.categoria.idcategoria, // Cambiado a idautor
        categoria: this.categoria.categoria,
      });
    }
  }

  public send() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }

  saveAndClose(): void {
    this.usuario = this.formGroup.value; // Obtener los valores del formulario

    if (this.editingMode) {
      this.CategoriaService.editarCategoria(this.usuario.idcategoria, this.usuario).subscribe(
        (response) => {
          this.datosGuardatos = response;
          console.log('categoria editado con éxito:', response);
          this.dialogRef.close(this.usuario);
        },
        (error) => {
          console.error('Error al editar categoria:', error);
        }
      );
    } else {
      this.CategoriaService.guardarCategoria(this.usuario).subscribe(
        (response) => {
          this.datosGuardatos = response;
          console.log('Categoria guardado con éxito:', response);
          this.dialogRef.close(this.usuario);
        },
        (error) => {
          console.error('Error al guardar el categoria:', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}