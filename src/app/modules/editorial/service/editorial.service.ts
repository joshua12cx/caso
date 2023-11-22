import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Editorial } from 'src/app/core/models/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  url:string = 'http://localhost:8080/api/'
  constructor(private http:HttpClient) { }
  listarEditorial(){
    return this.http.get<Editorial[]>(`${this.url}EDITORIAL/listEditorial`)
  }
  guardarEditorial( editorial: Editorial){
    return this.http.post<Editorial[]>(`${this.url}EDITORIAL/addEditorial`, editorial)
    .pipe(
      catchError((error)=>{
        console.error('error al guardar el editorial', error);
        throw error;
      })
    );
  }
  eliminarEditorial(ideditorial: number):Observable<any>{
    const url = `${this.url}EDITORIAL/deleteEditorial/${ideditorial}`;
    return this.http.delete(url);
  }
  editarEditorial(ideditorial:number, EditorialAcutalizado: Editorial):Observable<any>{
    const url = `${this.url}EDITORIAL/updateEditorial/${ideditorial}`;
    return this.http.patch(url, EditorialAcutalizado);
  }

  obtenerEditorialPorId(ideditorial: number): Observable<Editorial>{
    const url = `${this.url}EDITORIAL/buscarEditorialPorId/${ideditorial}`;
    return this.http.get<Editorial>(url);
  }
}


