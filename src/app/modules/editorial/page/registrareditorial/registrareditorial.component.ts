import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Editorial } from 'src/app/core/models/editorial';
import { EditorialService } from '../../service/editorial.service';

@Component({
  selector: 'app-registrareditorial',
  templateUrl: './registrareditorial.component.html',
  styleUrls: ['./registrareditorial.component.css']
})
export class RegistrareditorialComponent implements OnInit {
  usuario: Editorial;
  formGroup: FormGroup = new FormGroup({});
  editorial: Editorial;
  editingMode = false;

  datosGuardatos: Editorial[];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private EditorialService: EditorialService, // Corregido el nombre del servicio
    public dialogRef: MatDialogRef<RegistrareditorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editorial: Editorial }
  ) {
    this.editorial = data.editorial;
    this.editingMode = !!this.editorial;
  }

  ngOnInit(): void {
    this.inithiliazerInputs();
  }

  public inithiliazerInputs() {
    this.usuario = new Editorial();
    this.formGroup = new FormGroup({
      ideditorial: new FormControl(this.usuario.ideditorial), // Cambiado a idautor
      editorial: new FormControl(this.usuario.editorial, [Validators.required]),
    });

    if (this.editingMode) {
      this.formGroup.setValue({
        ideditorial: this.editorial.ideditorial, // Cambiado a idautor
        editorial: this.editorial.editorial,
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
      this.EditorialService.editarEditorial(this.usuario.ideditorial, this.usuario).subscribe(
        (response) => {
          this.datosGuardatos = response;
          console.log('ediorial editado con éxito:', response);
          this.dialogRef.close(this.usuario);
        },
        (error) => {
          console.error('Error al editar editorial:', error);
        }
      );
    } else {
      this.EditorialService.guardarEditorial(this.usuario).subscribe(
        (response) => {
          this.datosGuardatos = response;
          console.log('Editorial guardado con éxito:', response);
          this.dialogRef.close(this.usuario);
        },
        (error) => {
          console.error('Error al guardar Editorial:', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}