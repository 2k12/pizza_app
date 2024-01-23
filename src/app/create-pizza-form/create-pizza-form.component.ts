import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-pizza-form',
  templateUrl: './create-pizza-form.component.html',
  styleUrls: ['./create-pizza-form.component.css']
})
export class CreatePizzaFormComponent implements OnInit {

  nuevaPizza: any = { piz_name: '', piz_origin: '', piz_state: true };
  guardarPizza!: Function; // Propiedad para recibir la función
  constructor(private dialogRef: MatDialogRef<CreatePizzaFormComponent>) { }

  ngOnInit(): void {
  }

  agregarPizza() {
    // Aquí implementa la lógica para agregar una pizza utilizando this.nuevaPizza
    this.guardarPizza(this.nuevaPizza); // Llama a la función proporcionada desde 
    this.dialogRef.close();
  }
  cancelarCreacion() {
    // Cierra la ventana modal al hacer clic en "Cancelar"
    this.dialogRef.close();
  }
}
