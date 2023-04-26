import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PublicacionService } from '../publicacion.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publicacion } from '../publicacion';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Review } from '../publicacion';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-publicacion-create',
  templateUrl: './publicacion-create.component.html',
  styleUrls: ['./publicacion-create.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PublicacionCreateComponent implements OnInit {

  @ViewChild('textAreaInput') inputName: any | undefined; // accessing the reference element
  reviews: Review[] = [];

  constructor(
    private publicacionService: PublicacionService,
    config: NgbModalConfig,
    private _snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  handleClear(){
    // clearing the value
    console.log(this.inputName)
    this.inputName.nativeElement.value = '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  getPrediction(text: string): void {
    if(this.inputName.nativeElement.value == ''){
      this.openSnackBar("Por favor ingrese un texto", "Cerrar")
      return;
    }
    this.spinner.show();
    this.handleClear();
    this.publicacionService.predictOneReview(text).subscribe((prediction) => {
      const sentimiento = prediction[0].charAt(0).toUpperCase() + prediction[0].slice(1)
      let review: any = new Review(0, text, sentimiento);
      this.reviews.push(review);
      this.publicacionService.setReviews(this.reviews);
      this.spinner.hide();
      if (review.sentimiento == 'positivo'){
        this.openSnackBar("El sentimiento de la publicación es positivo", "Cerrar")
      }else{
        this.openSnackBar("El sentimiento de la publicación es negativo", "Cerrar")
      }
      this.router.navigate(['/posts/', 'listar']);
    });
  }
}
