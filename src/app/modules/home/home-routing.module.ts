import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'welcome',
    loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path:'convenio',
    loadChildren: () => import('../convenios/convenios.module').then(m => m.ConveniosModule)
  },
  {
    path:'autor',
    loadChildren: () => import('../autor/autor.module').then(m => m.AutorModule)
  },
  {
    path:'categoria',
    loadChildren: () => import('../categoria/categoria.module').then(m=>m.CategoriaModule)
  },
 
  {
    path:'editorial',
    loadChildren: () => import('../editorial/editorial.module').then(m=>m.EditorialModule)
  },
   



  {
    path:'**',
    redirectTo:'welcome'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
