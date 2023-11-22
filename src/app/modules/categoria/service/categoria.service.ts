import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Categoria } from 'src/app/core/models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url:string = 'http://localhost:8080/api/'
  constructor(private http:HttpClient) { }
  listarCategoria(){
    return this.http.get<Categoria[]>(`${this.url}CATEGORIA/listCategoria`)
  }
  guardarCategoria( categoria: Categoria){
    return this.http.post<Categoria[]>(`${this.url}CATEGORIA/addCategoria`, categoria)
    .pipe(
      catchError((error)=>{
        console.error('error al guardar el autor', error);
        throw error;
      })
    );
  }
  eliminarCategoria(idcategoria: number):Observable<any>{
    const url = `${this.url}CATEGORIA/deleteCategoria/${idcategoria}`;
    return this.http.delete(url);
  }
  editarCategoria(idcategoria:number, CategoriaAcutalizado: Categoria):Observable<any>{
    const url = `${this.url}CATEGORIA/updateCategoria/${idcategoria}`;
    return this.http.patch(url, CategoriaAcutalizado);
  }

  obtenerCategoriaPorId(idcategoria: number): Observable<Categoria>{
    const url = `${this.url}CATEGORIA/buscarCategoriaPorId/${idcategoria}`;
    return this.http.get<Categoria>(url);
  }
}
