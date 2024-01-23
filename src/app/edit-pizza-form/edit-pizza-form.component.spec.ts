import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPizzaFormComponent } from './edit-pizza-form.component';

describe('EditPizzaFormComponent', () => {
  let component: EditPizzaFormComponent;
  let fixture: ComponentFixture<EditPizzaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPizzaFormComponent]
    });
    fixture = TestBed.createComponent(EditPizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
