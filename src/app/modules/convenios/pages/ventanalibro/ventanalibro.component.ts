import { ConvenioService } from './../../services/convenio.service';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ConvenioComponent } from '../convenio/convenio.component';
import { Router } from '@angular/router';


import {  Libros } from 'src/app/core/models/libros.models';
import { Autor } from 'src/app/core/models/autor.models';
import { Editorial } from 'src/app/core/models/editorial';
import { Categoria } from 'src/app/core/models/categoria.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventanalibro',
  templateUrl: './ventanalibro.component.html',
  styleUrls: ['./ventanalibro.component.css']
})
export class VentanalibroComponent implements OnInit {

  usuario: Libros;
  formGroup: FormGroup = new FormGroup({});
  libro: Libros;  

  editingMode = false;

  

 // Autor
 autorlist: Autor[] = [];
 // Categoria 
 categorialist: Categoria[] = [];
 // Editorial
 editoriallist: Editorial[]=[];

 // PARA PODER EDITAR 
  datosGuardados: Libros[];


//Autor
listarAutor() {
  this.ConvenioService.listarAutor().subscribe({
next: (resp:Autor[]) => {
this.autorlist = resp
},
error: (err:any) => {console.log(err)}
  })
}

//Categoria
listarCategoria() {
  this.ConvenioService.listarCategoria().subscribe({
next: (resp:Categoria[]) => {
this.categorialist = resp
},
error: (err:any) => {console.log(err)}
  })
}
//Editorial
listarEditorial() {
  this.ConvenioService.listarEditorial().subscribe({
next: (resp: Editorial[]) => {
this.editoriallist = resp
},
error: (err:any) => {console.log(err)}
  })
}


 constructor(
    private dialog: MatDialog,
    private router: Router,
    private ConvenioService: ConvenioService,
    public dialogRef: MatDialogRef<VentanalibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { libro: Libros }
  ) {
    this.libro = data.libro; // Almacena los datos de 'data.libro' en 'libro'
    this.editingMode = !!this.libro; // Indica si estamos en modo de edición
  }

  ngOnInit() {
    this.inithiliazerInputs();
    this.listarAutor();
    this.listarCategoria();
    this.listarEditorial();

  }
 
  public inithiliazerInputs() {
    this.usuario = new Libros();
    this.formGroup = new FormGroup({
      titulo: new FormControl(this.usuario.titulo, [Validators.required]),
      lanzamiento: new FormControl(this.usuario.lanzamiento, [Validators.required]),
      autor: new FormControl(this.usuario.id_autor, [Validators.required]),
      categoria: new FormControl(this.usuario.id_categoria, [Validators.required]),
      editorial: new FormControl(this.usuario.id_editorial, [Validators.required]),
      idioma: new FormControl(this.usuario.idioma, [Validators.required]),
      paginas: new FormControl(this.usuario.paginas, [Validators.required]),
      descripcion: new FormControl(this.usuario.descripcion, [Validators.required]),
      portada: new FormControl(this.usuario.portada, [Validators.required]),
    });
  
    // Verifica si estamos en modo de edición y actualiza el formulario con los datos del libro
    if (this.editingMode) {
      this.formGroup.setValue({
        titulo: this.libro.titulo,
        lanzamiento: this.libro.lanzamiento,
        autor: this.libro.id_autor.idautor,
        categoria: this.libro.id_categoria.idcategoria,
        editorial: this.libro.id_editorial.ideditorial,
        idioma: this.libro.idioma,
        paginas: this.libro.paginas,
        descripcion: this.libro.descripcion,
        portada: this.libro.portada,
      });
    }
  }
  
  
 


  public send() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }


  saveAndClose(): void {
    if (this.formGroup.valid) {
      // Obtén los valores del formulario y asígnales a las propiedades del objeto 'usuario'
      this.usuario.titulo = this.formGroup.get('titulo').value;
      this.usuario.lanzamiento = this.formGroup.get('lanzamiento').value;
      this.usuario.id_autor = this.formGroup.get('autor').value;
      this.usuario.id_categoria = this.formGroup.get('categoria').value;
      this.usuario.id_editorial = this.formGroup.get('editorial').value;
      this.usuario.idioma = this.formGroup.get('idioma').value;
      this.usuario.paginas = this.formGroup.get('paginas').value;
      this.usuario.descripcion = this.formGroup.get('descripcion').value;
      this.usuario.portada = this.formGroup.get('portada').value;
  
      if (this.editingMode == !null) {
        // Si estamos en modo de edición, llamamos al servicio para actualizar el libro existente
        this.ConvenioService.editarLibro(this.libro.asin, this.usuario).subscribe(
          (response) => {
            this.datosGuardados = response;
            console.log('Libro editado con éxito:', response);
            this.dialogRef.close(this.usuario);
          },
          (error) => {
            console.error('Error al editar el libro:', error);
          }
        );
      } else {
        // Si no estamos en modo de edición, llamamos al servicio para guardar un nuevo libro
        this.ConvenioService.guardarLibro(this.usuario).subscribe(
          (response) => {
            this.datosGuardados = response;
            console.log('Libro guardado con éxito:', response);
            this.dialogRef.close(this.usuario);
          },
         
        );
      }
    }
  }
  
  


onNoClick(): void {
  this.dialogRef.close(); // Cierra la ventana emergente 
}


}




