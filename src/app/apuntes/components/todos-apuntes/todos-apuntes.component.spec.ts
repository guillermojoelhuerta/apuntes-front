import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosApuntesComponent } from './todos-apuntes.component';

describe('TodosApuntesComponent', () => {
  let component: TodosApuntesComponent;
  let fixture: ComponentFixture<TodosApuntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosApuntesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosApuntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
