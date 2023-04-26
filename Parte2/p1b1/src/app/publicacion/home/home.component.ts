import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../publicacion.service';
import { Publicacion, Review } from '../publicacion';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  reviews: Review[] = [];

  constructor() {}

  ngOnInit() {
  }
}
