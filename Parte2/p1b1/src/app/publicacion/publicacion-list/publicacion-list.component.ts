import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../publicacion.service';
import { Publicacion, Review } from '../publicacion';


@Component({
  selector: 'app-publicacion-list',
  templateUrl: './publicacion-list.component.html',
  styleUrls: ['./publicacion-list.component.css']
})

export class PublicacionListComponent implements OnInit {

  reviews: Review[] = [];

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit() {
    this.reviews = this.publicacionService.getReviews();
  }
}
