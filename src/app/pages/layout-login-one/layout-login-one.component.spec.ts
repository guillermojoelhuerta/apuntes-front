import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoginOneComponent } from './layout-login-one.component';

describe('LayoutLoginOneComponent', () => {
  let component: LayoutLoginOneComponent;
  let fixture: ComponentFixture<LayoutLoginOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLoginOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoginOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
