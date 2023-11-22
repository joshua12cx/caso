import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorialComponent } from './page/editorial/editorial.component';

const routes: Routes = [
  {
    path:'',
  component: EditorialComponent,
  outlet:'child'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorialRoutingModule { }
