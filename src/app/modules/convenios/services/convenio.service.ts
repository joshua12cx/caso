import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { Autor } from 'src/app/core/models/autor.models';
import { Categoria } from 'src/app/core/models/categoria.models';
import { Editorial } from 'src/app/core/models/editorial';
import { Libros } from 'src/app/core/models/libros.models';
import { VentanalibroComponent } from '../pages/ventanalibro/ventanalibro.component';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  open(VentanalibroComponent: VentanalibroComponent, arg1: { size: string; }) {
    throw new Error('Method not implemented.');
  }

  url:string = 'http://localhost:8080/api/'
  constructor(private http:HttpClient) { }

  listarAutor(){
return this.http.get<Autor[]>(`${this.url}AUTOR/listAutor`) 
  }

 listarCategoria(){
    return this.http.get<Categoria[]>(`${this.url}CATEGORIA/listCategoria`)
  }

listarEditorial(){
return this.http.get<Editorial[]>(`${this.url}EDITORIAL/listEditorial`)
}

listarLibros(){
  return this.http.get<Libros[]>(`${this.url}LIBRO/listLibro`) 
}


guardarLibro( libro: Libros) {
  return this.http.post<Libros[]>(`${this.url}LIBRO/addLibro`, libro)
    .pipe(
      catchError((error) => {
        console.error('Error al guardar el libro:', error);
        throw error; // Puedes personalizar cómo manejar el error aquí
      })
    );
}

eliminarLibro(asin: number): Observable<any> {
  const url = `${this.url}LIBRO/deleteLibro/${asin}`;
  return this.http.delete(url);
}


editarLibro(asin: number, libroActualizado: Libros): Observable<any> {
  const url = `${this.url}LIBRO/updateLibro/${asin}`;
  return this.http.patch(url, libroActualizado);
}

obtenerLibroPorId(asin: number): Observable<Libros> {
  const url = `${this.url}LIBRO/searchLibro/${asin}`;
  return this.http.get<Libros>(url);
}


}