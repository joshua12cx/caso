import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from 'src/app/core/models/autor.models';
import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutorService {
  url:string = 'http://localhost:8080/api/'
  constructor(private http:HttpClient) { }
  listarAutor(){
    return this.http.get<Autor[]>(`${this.url}AUTOR/listAutor`) 
      }
    
      guardarAutor( autor: Autor) {
        return this.http.post<Autor[]>(`${this.url}AUTOR/addAutor`, autor)
          .pipe(
            catchError((error) => {
              console.error('Error al guardar el autor:', error);
              throw error; // Puedes personalizar cómo manejar el error aquí
            })
          );
      }
      
      eliminarAutor(idautor: number): Observable<any> {
        const url = `${this.url}AUTOR/deleteAutor/${idautor}`;
        return this.http.delete(url);
      }
      
      
      editarAutor(idautor: number, AutorActualizado: Autor): Observable<any> {
        const url = `${this.url}AUTOR/updateAutor/${idautor}`;
        return this.http.patch(url, AutorActualizado);
      }
      
      obtenerAutorPorId(idautor: number): Observable<Autor> {
        const url = `${this.url}AUTOR/buscarAutorPorId/${idautor}`;
        return this.http.get<Autor>(url);
      }
    

}
