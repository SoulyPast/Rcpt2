import { Component, OnInit } from '@angular/core';
import { RECEPTES, COMENTARIS, Comentaris, Receptes} from '../receptes';
import * as $ from 'jquery';
import axios from 'axios';

@Component({
  selector: 'app-receptes',
  templateUrl: './receptes.component.html',
  styleUrls: ['./receptes.component.css']
})
export class ReceptesComponent implements OnInit {
  // guarda la date de creacion del comentrario
   f = new Date();
   data = this.f.getDate() + "/" + ( this.f.getMonth() +1) + "/" +  this.f.getFullYear();

  //declarar los variables que hacen falta
  recept = RECEPTES;
  coment = COMENTARIS;
  name='';
  array=[];
  selec='';
  buscadorReceptes ='';
  selector='';
  comenta:Comentaris = new Comentaris;
  nom ='';
  constructor() { }
  //funcion crea comentario
  crearComentari(){
    this.comenta.createdOn=this.data;
    this.coment.push(this.comenta);
    var rec =this.comenta.id_recepta;
    var nom='';
    var ing='';
    var desc='';
    this.recept.map(function(dato){
      if(dato.id_recepta == rec){
        nom = dato.nom_recepta;
        ing =dato.ingredients;
        desc = dato.descripcio;
      }
      
    });
   //filtrar los comentarios de cada recepte
    var cm =this.coment.map(function(datoo){
      if(datoo.id_recepta == rec){
        console.log(datoo);
        return datoo;
      }
      

  
    });
    //asegurar que l array de comentarios sin valores vacios.
    var cvr= cm.filter(Boolean);
    //añadir el comentario a cada recepte
    axios.put('http://localhost:3000/receptes/'+this.comenta.id_recepta, {
      id: this.comenta.id_recepta,
      nom: nom,
      elaboracio: desc,
      ingredients: ing,
      reviews: cvr
    }).then(resp => {
        console.log(resp.data);
    //utilizar el try y catch para ordenar y mostrar el erroren el caso de que hay algun fallo.
    }).catch(error => {
    
        console.log(error);
    });  
    //this.coment.push(this.comenta);
    this.comenta = new Comentaris;
  }
  //funcion eliminar recepta
  eliminar(valor){
    //elimino el recepte en mi object (visualmente)
    //buscar la recepte: valor es el id recepte le paso como parametro a la funcion de eliminar   
    var pos = this.recept.map(function(e) { return e.id_recepta; }).indexOf(valor);
    this.recept.splice(pos,1)
    //eliminar recepte des de el json utilizando delete
    axios.delete('http://localhost:3000/receptes/'+valor)
    .then(resp => {
        console.log(resp.data)
    }).catch(error => {
        console.log(error);
    });   
  }
  //funcion editar recepta
  edit(valor){
    var nom=$("#recept"+valor).val();
    var ing=$("#ingre"+valor).val();
    var desc=$("#desc"+valor).val();
    // cambiar los valores de la recepta..
    this.recept.map(function(dato){
      if(dato.id_recepta == valor){
        dato.nom_recepta = nom.toString();
        dato.ingredients = ing.toString();
        dato.descripcio = desc.toString();
      }
      
      return dato;
    });
//filtrar los comentarios de cada recepte
    var ccom =this.coment.map(function(datoo){
      if(datoo.id_recepta == valor){
        console.log(datoo);
        return datoo;
      }
    });
    //array sin valores vacios.
    var ccvr= ccom.filter(Boolean);
    // guardar los cambios en el archivo json
    axios.put('http://localhost:3000/receptes/'+valor, {
      id: valor,
      nom: $("#recept"+valor).val(),
      elaboracio: $("#ingre"+valor).val(),
      ingredients: $("#desc"+valor).val(),
      reviews: ccvr
        
      
    }).then(resp => {
        console.log(resp.data);
    }).catch(error => {
    
        console.log(error);
    });  
    
  }
 
  // la funcion de ordena 
  onChange(deviceValue){
    this.selec=deviceValue;
  }
  ngOnInit(): void {
    //selecionar un valor por defecto para cada select que tengo en html
    this.selector = "Tria una opció";
    this.comenta.stars= 5;
  
    // mostrar comentarios des de el jso utilizando el axios para hacer las consultas. 
    axios.get('http://localhost:3000/receptes')
            .then(resp => {
                var data = resp.data;
                // guardar los comentarios en data i pasar la a l'array de objetos de receptas.
                data.forEach(e => {
                  e.reviews.forEach(c =>{
                    this.comenta.id_recepta=e.id;
                    this.comenta.createdOn=c.createdOn;
                    this.comenta.body=c.body;
                    this.comenta.stars=c.stars;
                    this.coment.push(this.comenta);
                    this.comenta = new Comentaris;
                  })
                });
            })
            .catch(error => {
                console.log(error);
            });
  }

}

