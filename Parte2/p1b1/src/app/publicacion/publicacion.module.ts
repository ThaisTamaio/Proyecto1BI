import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionListComponent } from './publicacion-list/publicacion-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PublicacionListComponent],
  declarations: [PublicacionListComponent]
})
export class PublicacionModule { }
