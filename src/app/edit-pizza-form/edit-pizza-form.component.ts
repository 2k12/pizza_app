import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-pizza-form',
  templateUrl: './edit-pizza-form.component.html',
  styleUrls: ['./edit-pizza-form.component.css']
})
export class EditPizzaFormComponent implements OnInit {

  pizza: any;
   guardarPizza!: Function; // Propiedad para recibir la función

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.pizza = { ...data };
  }

  ngOnInit(): void {
  }

  editarPizza() {
    // Aquí implementa la lógica para editar la pizza utilizando this.pizza
    this.guardarPizza(this.pizza); // Llama a la función proporcionada desde HomeComponent
  }
  
}
