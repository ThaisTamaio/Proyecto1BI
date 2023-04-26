export class Publicacion {
  id: number;
  text: string;
  date: any;
  classification: string;
  person: string;

  constructor(
    id: number,
    text: string,
    date: any,
    classificacion: string,
    person: string
  ){
    this.id = id;
    this.text = text;
    this.date = date;
    this.classification = classificacion;
    this.person = person;
  }
}

export class Review {
  id: number;
  review_es: string;
  sentimiento: string;

  constructor(
    id: number,
    review_es: string,
    sentimiento: string,
  ){
    this.id = id;
    this.review_es = review_es;
    this.sentimiento = sentimiento;
  }
}
