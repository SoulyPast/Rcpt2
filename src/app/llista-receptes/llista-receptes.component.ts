import { Component, OnInit } from '@angular/core';
import { Receptes, RECEPTES} from '../receptes';
import axios from 'axios';

@Component({
  selector: 'app-llista-receptes',
  templateUrl: './llista-receptes.component.html',
  styleUrls: ['./llista-receptes.component.css']
})
export class LlistaReceptesComponent implements OnInit {
  //genero un id para cada recepte
  id = Date.now(); 
  //recept es el valor que utilizo en html para imprimir lo valores
  recept = RECEPTES;
  //declaro el objeto
  recepta:Receptes = new Receptes();
  constructor() {
  }
  array =[];
  
  crearRecepta(){
    //añadir una recepta nueva en mi objeto que esta en recept.ts
    //this.recept.push(this.recepta);
    
    //this.id = Date.now();
    this.recepta.id_recepta=this.id;
    this.recept.push(this.recepta);
   
    this.id = Date.now(); 
    axios.post('http://localhost:3000/receptes', {
    id: Date.now(),
    nom: this.recepta.nom_recepta,
    elaboracio: this.recepta.descripcio,
    ingredients: this.recepta.ingredients,
    reviews: this.array
    }).then(resp => {
        console.log(resp.data);
    }).catch(error => {
        console.log(error);
    });
    
    this.recepta = new Receptes();
    
   
    
  }
 
  ngOnInit() {
    //jquery esto lo hecho para que no deja enviar el formulario null y que el button de enviar salga disabled.
    //combrobar si el usuario como minimo tiene dos campos con datos y activar el button de enviar.
    // no me ha dejado desctivar el button des de html utilizando ng-disabled porque no es compatible con ng modal ademas 
    //me estaba bloquendo los pipes de busqueda al final para evitar problemas lo hecho con jquey!!
    var count=0;
    $("#submit").prop('disabled', true);
    $('#nom').change(function(){
    count = count+1;
    if(count==2){
      $("#submit").prop('disabled', false);
    }
    });

    $('#ingere').change(function(){
      count = count+1;
      if(count==2){
        $("#submit").prop('disabled', false);
      }
      });

      $('#desc').change(function(){
        count = count+1;
        if(count==2){
          $("#submit").prop('disabled', false);
        }
        });

        this.mostrar();
  }

  
  mostrar(){
// mostrar las receptas des de el jso utilizando el axios para hacer las consultas. 
        axios.get('http://localhost:3000/receptes')
            .then(resp => {
                var data = resp.data;
                console.log(this.recept.length, data.length ,"DALE")
                data.forEach(e => {
                   // guardar las receptas en data i pasarla a l'array de objetos de comentarios.
                  console.log(e.id);
                    this.recepta.id_recepta=e.id;
                    this.recepta.nom_recepta=e.nom;
                    this.recepta.descripcio=e.elaboracio;
                    this.recepta.ingredients=e.ingredients;
                    this.recept.push(this.recepta);
                    this.recepta = new Receptes();
                });
            })
            .catch(error => {
                console.log(error);
            });

  }

}