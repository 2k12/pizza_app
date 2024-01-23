import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-pizza-form',
  templateUrl: './create-pizza-form.component.html',
  styleUrls: ['./create-pizza-form.component.css']
})
export class CreatePizzaFormComponent implements OnInit {

  nuevaPizza: any = { piz_name: '', piz_origin: '', piz_state: true };
  guardarPizza!: Function; // Propiedad para recibir la función

  constructor() { }

  ngOnInit(): void {
  }

  agregarPizza() {
    // Aquí implementa la lógica para agregar una pizza utilizando this.nuevaPizza
    this.guardarPizza(this.nuevaPizza); // Llama a la función proporcionada desde HomeComponent
  }
}
