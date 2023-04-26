import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicacionService } from '../publicacion.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publicacion, Review } from '../publicacion';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacion-cargar',
  templateUrl: './publicacion-cargar.component.html',
  styleUrls: ['./publicacion-cargar.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class PublicacionCargarComponent implements OnInit {

  reviews: Review[] = [];
  file!: File; // Variable to store file

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  getPrediction(): void {
    if (this.file == undefined) {
      this.openSnackBar("Por favor seleccione un archivo", "Cerrar")
      return;
    }
    this.spinner.show();
    this.publicacionService.predictFile(this.file).subscribe((prediction) => {

      let i = 0

      const reader = new FileReader();
      reader.readAsText(this.file);

      reader.onload = () => {
        const fileContent = reader.result as string;
        let csvToRowArray = fileContent.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          const LIMITE = 350;
          let row = csvToRowArray[index];
          let text = row.slice(row.indexOf(',') + 1);

          if (text.length >= LIMITE) {
            text = text.slice(0, LIMITE) + '"...';
          }

          const sentimiento = prediction[i].charAt(0).toUpperCase() + prediction[i].slice(1)

          let review: any = new Review(i+1, text, sentimiento);
          this.reviews.push(review);
          i++
        }
      }

      this.publicacionService.setReviews(this.reviews);
      this.spinner.hide();
      this.openSnackBar("Datos cargados", "Cerrar")
      this.router.navigate(['/posts/', 'listar']);
    });
  }
}
