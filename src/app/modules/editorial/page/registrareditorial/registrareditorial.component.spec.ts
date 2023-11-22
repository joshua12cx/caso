import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrareditorialComponent } from './registrareditorial.component';

describe('RegistrareditorialComponent', () => {
  let component: RegistrareditorialComponent;
  let fixture: ComponentFixture<RegistrareditorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrareditorialComponent]
    });
    fixture = TestBed.createComponent(RegistrareditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
