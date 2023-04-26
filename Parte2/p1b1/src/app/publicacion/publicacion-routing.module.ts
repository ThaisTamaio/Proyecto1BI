import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicacionListComponent } from './publicacion-list/publicacion-list.component';
import { PublicacionCreateComponent } from './publicacion-create/publicacion-create.component';
import { PublicacionCargarComponent } from './publicacion-cargar/publicacion-cargar.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [{
  path: 'posts',
  children: [
    {
      path: 'list',
      component: HomeComponent
    },
    {
      path: 'create',
      component: PublicacionCreateComponent
    },
    {
      path: 'cargar',
      component: PublicacionCargarComponent
    },
    {
      path: 'listar',
      component: PublicacionListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacionRoutingModule { }
