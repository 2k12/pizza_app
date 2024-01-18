import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasIngredientsComponent } from './pizzas-ingredients.component';

describe('PizzasIngredientsComponent', () => {
  let component: PizzasIngredientsComponent;
  let fixture: ComponentFixture<PizzasIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzasIngredientsComponent]
    });
    fixture = TestBed.createComponent(PizzasIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
