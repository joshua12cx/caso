import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/core/models/categoria.models';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';
import { RegistrarcategoriaComponent } from '../registrarcategoria/registrarcategoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{
 categorialist:Categoria[]=[];
 categoria: Categoria;
 datosGuardados: any;
 dialogRef: any;
 constructor(private dialog: MatDialog, private router: Router, private CategoriaService: CategoriaService){}
 
 listarCategoria(){
  this.CategoriaService.listarCategoria().subscribe({
    next: (resp: Categoria[])=>{
      this.categorialist = resp;
    },
    error:(err:any)=>{
      console.log(err);
    }
  });
   }
 
 
 ngOnInit(): void {
    this.listarCategoria();
  }

  openDialog(): void{
    const dialogRef= this.dialog.open(RegistrarcategoriaComponent,{
      data:{
        categoria: this.categoria
      },
    });

    dialogRef.afterClosed().subscribe((result: Categoria)=>{
      console.log('el dialo cerro');
      if(result){
        this.listarCategoria();
      }
    });

  }
 
deleteItem(item:any){
  const confirmar=window.confirm('¿deseas eliminar el contenido?');
  if(confirmar){
    this.CategoriaService.eliminarCategoria(item.idcategoria).subscribe({
      next:(resp: any)=>{
        console.log('categoria eliminada');
        this.listarCategoria();
      },
      error: (err:any)=>{
        console.error('error al elimnar la categoria',err);
      }
    });
  }
}

editItem(item: any){
  this.CategoriaService.obtenerCategoriaPorId(item.idcategoria).subscribe({
    next:(categoria: Categoria)=>{
      const dialogRef = this.dialog.open(RegistrarcategoriaComponent,{
        width: '400px',
        data:{categoria:categoria}
      });
      dialogRef.afterClosed().subscribe((categoriaEditado:Categoria)=>{
        if(categoriaEditado){
          this.guardarCambios(item.idcategoria, categoriaEditado);
        }else{
          console.log('edicion cancelada');
        }
      });
    },
    error:(err:any)=>{
      console.error('Error al obtener la categoria');
    }
  });
}

guardarCambios(idcategoria: number, categoriaEditado:Categoria){
  this.CategoriaService.editarCategoria(idcategoria, categoriaEditado).subscribe({
    next: (resp:any)=>{
      console.log('categoria editado con exito');
      this.listarCategoria();
    },
    error:(err:any)=>{
      console.error('error al editar el autor', err);
    }
  });
}

}
