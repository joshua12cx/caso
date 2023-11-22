import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Autor } from 'src/app/core/models/autor.models';
import { AutorService } from '../../service/autor.service';
import { Router } from '@angular/router';
import { RegistrarautorComponent } from '../registrarautor/registrarautor.component';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
autorlist: Autor[] = [];
 autor: Autor;
datosGuardados: any;
dialogRef: any;
constructor(private dialog: MatDialog, private router: Router, private AutorService: AutorService){}

listarAutor(){
  this.AutorService.listarAutor().subscribe({
    next: (resp: Autor[])=>{
      this.autorlist = resp;
    },
    error:(err:any)=>{
      console.log(err);
    }
  });
}
ngOnInit(): void {
  this.listarAutor();
}
openDialog(): void{
  const dialogRef= this.dialog.open(RegistrarautorComponent, {
    data :{
      autor: this.autor
    },
  });

  dialogRef.afterClosed().subscribe((result: Autor)=>{
  console.log('el DIALOGO DE CERRO');
    if(result){
      this.listarAutor();
    }
    
  });
}

deleteItem(item:any){
  const confirmar=window.confirm('¿desea eliminar ?');
  if(confirmar ){
    this.AutorService.eliminarAutor(item.idautor).subscribe({
      next:(resp: any)=>{
        console.log('autor eliminado con exito');
        this.listarAutor();
      },
      error: (err:any)=>{
        console.error('error al eliminar el libro',err);
      }
    });
  }
}

editItem(item: any){
  this.AutorService.obtenerAutorPorId(item.idautor).subscribe({
    next:(autor: Autor)=>{
      const dialogRef = this.dialog.open(RegistrarautorComponent,{
       width: '400px',
       data:{autor: autor}
      });
      dialogRef.afterClosed().subscribe((autorEditado:Autor)=>{
        if(autorEditado){
          this.guardarCambios(item.idautor, autorEditado);
        }else{
          console.log('Edicion cancelada');
        }
      })      ;
    },
    error: (err:any)=>{
      console.error('Error al obtener el autor');
    }
  });
}

guardarCambios(idautor: number, autorEditado:Autor){
  this.AutorService.editarAutor(idautor, autorEditado).subscribe({
    next: (resp:any)=>{
      console.log('autor editado con exito');
      this.listarAutor();
    },
    error:(err:any)=>{
      console.error('error al editar el libro', err);
    }
  });
}



}

