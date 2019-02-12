export class Beer {
  abv: Number;
  attenuation_level: Number;
  description: string;
  ebc: number;
  food_pairing: string[];
  ibu: number;
  id: number;
  image_url: string;
  name: string;
  ph: number;
  srm: number;
  tagline: string;
  isFav: Boolean;
  color: string;


  constructor(
    abv: Number,
    attenuation_level: Number,
    description: string,
    ebc: number,
    food_pairing: string[],
    ibu: number,
    id: number,
    image_url: string,
    name: string,
    ph: number,
    srm: number,
    tagline: string,
    isFav: Boolean
  ) {
    this.abv = abv;
    this.attenuation_level =  attenuation_level,
    this.description =  description,
    this.ebc =  ebc,
    this.food_pairing =  food_pairing,
    this.ibu =  ibu,
    this.id =  id,
    this.image_url =  image_url,
    this.name =  name,
    this.ph =  ph,
    this.srm =  srm,
    this.tagline =  tagline,
    this.isFav =  isFav;
  }
}
