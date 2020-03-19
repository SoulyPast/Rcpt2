
export class Receptes {
    id_recepta: number;
    nom_recepta: string;
    descripcio : string;
    ingredients: string;
}

export const RECEPTES: Receptes [] = [];

 export class Comentaris {
 id_recepta: number;
  body: string;
  stars: number;
  createdOn: string;
 }
 
export const COMENTARIS: Comentaris [] = [];



