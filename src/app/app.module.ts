import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IngredientesComponent } from './ingredients/ingredients.component';
import { PizzasIngredientsComponent } from './pizzas-ingredients/pizzas-ingredients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientesComponent,
    PizzasIngredientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
