import { Component, Inject, OnInit } from '@angular/core';
import { Autor } from 'src/app/core/models/autor.models';
import { AutorService } from '../../service/autor.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarautor',
  templateUrl: './registrarautor.component.html',
  styleUrls: ['./registrarautor.component.css']
})
export class RegistrarautorComponent implements OnInit {
  usuario: Autor;
  formGroup: FormGroup = new FormGroup({});
  autor: Autor;
  editingMode = false;

  datosGuardatos: Autor[];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private autorService: AutorService, // Corregido el nombre del servicio
    public dialogRef: MatDialogRef<RegistrarautorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { autor: Autor }
  ) {
    this.autor = data.autor;
    this.editingMode = !!this.autor;
  }

  ngOnInit(): void {
    this.inithiliazerInputs();
  }

  public inithiliazerInputs() {
    this.usuario = new Autor();
    this.formGroup = new FormGroup({
      idautor: new FormControl(this.usuario.idautor), // Cambiado a idautor
      autor: new FormControl(this.usuario.autor, [Validators.required]),
    });

    if (this.editingMode) {
      this.formGroup.setValue({
        idautor: this.autor.idautor, // Cambiado a idautor
        autor: this.autor.autor,
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
      this.autorService.editarAutor(this.usuario.idautor, this.usuario).subscribe(
        (response) => {
          this.datosGuardatos = response;
          console.log('autor editado con éxito:', response);
          this.dialogRef.close(this.usuario);
        },
        (error) => {
          console.error('Error al editar el autor:', error);
        }
      );
    } else {
      this.autorService.guardarAutor(this.usuario).subscribe(
        (response) => {
          this.datosGuardatos = response;
          console.log('Autor guardado con éxito:', response);
          this.dialogRef.close(this.usuario);
        },
        (error) => {
          console.error('Error al guardar el autor:', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
