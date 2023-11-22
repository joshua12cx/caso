import { ConvenioService } from './../../services/convenio.service';
import { Libros } from 'src/app/core/models/libros.models';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VentanalibroComponent } from '../ventanalibro/ventanalibro.component';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.css']
})
export class ConvenioComponent implements OnInit {
  librosList: Libros[] = []; // Cambiado de lisbroslist a librosList
  

  libro: Libros; // Cambiado de Libro a libro
  datosGuardados: any;
  dialogRef: any;

  constructor(private dialog: MatDialog, private router: Router, private ConvenioService: ConvenioService) { }

  
  listarLibros() { 
    this.ConvenioService.listarLibros().subscribe({
      next: (resp: Libros[]) => {
        this.librosList = resp;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  ngOnInit() {
    this.listarLibros();
  }
  

  // ABRIR LA VENTANA EMERGENTE
  openDialog(): void {
    const dialogRef = this.dialog.open(VentanalibroComponent, {
      data: {
        libro: this.libro
      },
    });
  
    dialogRef.afterClosed().subscribe((result: Libros) => {
      console.log('El diálogo se cerró');
      if (result) {

        this.listarLibros();
      }
    });
  }
  
//ELIMINAR LIBROS
  deleteItem(item: any) {
   
  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este libro?');

  if (confirmar) {
    this.ConvenioService.eliminarLibro(item.asin).subscribe({
      next: (resp: any) => {
        console.log('Libro eliminado con éxito');
        // Después de eliminar el libro, actualiza la lista de libros
        this.listarLibros();
      },
      error: (err: any) => {
        console.error('Error al eliminar el libro', err);
      }
    });
  }
  }

  //EDITAR LIBRO

  editItem(item: any) {
  this.ConvenioService.obtenerLibroPorId(item.asin).subscribe({
    next: (libro: Libros) => {
      const dialogRef = this.dialog.open(VentanalibroComponent, {
        width: '400px',
        data: { libro: libro } // Pasamos el libro al abrir el diálogo
      });

      dialogRef.afterClosed().subscribe((libroEditado: Libros) => {
        if (libroEditado) {
          this.guardarCambios(item.asin, libroEditado);
        } else {
          console.log('Edición cancelada');
        }
      });
    },
    error: (err: any) => {
      console.error('Error al obtener el libro', err);
    }
  });
}




  // Función para guardar los cambios en el mismo ID del libro existente
  guardarCambios(asin: number, libroEditado: Libros) {
    this.ConvenioService.editarLibro(asin, libroEditado).subscribe({
      next: (resp: any) => {
        console.log('Libro editado con éxito');
        // Actualiza la lista de libros si es necesario
        this.listarLibros();
      },
      error: (err: any) => {
        console.error('Error al editar el libro', err);
      }
    });
  }
  




}
