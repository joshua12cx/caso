import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Editorial } from 'src/app/core/models/editorial';
import { EditorialService } from '../../service/editorial.service';
import { RegistrareditorialComponent } from '../registrareditorial/registrareditorial.component';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {
  editoriallist:Editorial[]=[];
  editorial: Editorial;
  datosGuardados: any;
  dialogRef: any;
  constructor(private dialog: MatDialog, private router: Router, private EditorialService: EditorialService){}
  
  listarEditorial(){
   this.EditorialService.listarEditorial().subscribe({
     next: (resp: Editorial[])=>{
       this.editoriallist = resp;
     },
     error:(err:any)=>{
       console.log(err);
     }
   });
    }
  
  
  ngOnInit(): void {
     this.listarEditorial();
   }
 
   openDialog(): void{
     const dialogRef= this.dialog.open(RegistrareditorialComponent,{
       data:{
         editorial: this.editorial
       },
     });
 
     dialogRef.afterClosed().subscribe((result: Editorial)=>{
       console.log('el dialogo cerro');
       if(result){
         this.listarEditorial();
       }
     });
 
   }
  
 deleteItem(item:any){
   const confirmar=window.confirm('¿deseas eliminar el contenido?');
   if(confirmar){
     this.EditorialService.eliminarEditorial(item.ideditorial).subscribe({
       next:(resp: any)=>{
         console.log('editorial eliminada');
         this.listarEditorial();
       },
       error: (err:any)=>{
         console.error('error al elimnar editorial',err);
       }
     });
   }
 }
 
 editItem(item: any){
   this.EditorialService.obtenerEditorialPorId(item.ideditorial).subscribe({
     next:(editorial: Editorial)=>{
       const dialogRef = this.dialog.open(RegistrareditorialComponent,{
         width: '400px',
         data:{editorial:editorial}
       });
       dialogRef.afterClosed().subscribe((editorialEditado:Editorial)=>{
         if(editorialEditado){
           this.guardarCambios(item.ideditorial, editorialEditado);
         }else{
           console.log('edicion cancelada');
         }
       });
     },
     error:(err:any)=>{
       console.error('Error al obtener editorial');
     }
   });
 }
 
 guardarCambios(ideditorial: number, editorialEditado:Editorial){
   this.EditorialService.editarEditorial(ideditorial, editorialEditado).subscribe({
     next: (resp:any)=>{
       console.log('editorial editado con exito');
       this.listarEditorial();
     },
     error:(err:any)=>{
       console.error('error al editar editorial', err);
     }
   });
 }
}
