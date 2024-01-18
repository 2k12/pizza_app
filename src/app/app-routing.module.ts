import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IngredientesComponent } from './ingredients/ingredients.component';  // Asegúrate de importar tu componente
import { PizzasIngredientsComponent } from './pizzas-ingredients/pizzas-ingredients.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ingredients', component: IngredientesComponent },
  { path: 'pizzas-ingredients', component: PizzasIngredientsComponent },
  // Agrega la ruta para IngredientesComponent aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
