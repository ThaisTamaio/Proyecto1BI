import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacionListComponent } from './publicacion/publicacion-list/publicacion-list.component';
import { PublicacionCreateComponent } from './publicacion/publicacion-create/publicacion-create.component';
import { PublicacionCargarComponent } from './publicacion/publicacion-cargar/publicacion-cargar.component';
import { HomeComponent } from './publicacion/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'posts/create', component: PublicacionCreateComponent},
  { path: 'posts/cargar', component: PublicacionCargarComponent},
  { path: 'posts/listar', component: PublicacionListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
