import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePizzaFormComponent } from './create-pizza-form.component';

describe('CreatePizzaFormComponent', () => {
  let component: CreatePizzaFormComponent;
  let fixture: ComponentFixture<CreatePizzaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePizzaFormComponent]
    });
    fixture = TestBed.createComponent(CreatePizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
