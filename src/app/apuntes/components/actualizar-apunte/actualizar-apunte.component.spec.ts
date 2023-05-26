import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarApunteComponent } from './actualizar-apunte.component';

describe('ActualizarApunteComponent', () => {
  let component: ActualizarApunteComponent;
  let fixture: ComponentFixture<ActualizarApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarApunteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
