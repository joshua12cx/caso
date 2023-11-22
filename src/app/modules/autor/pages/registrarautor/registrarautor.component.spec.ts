import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarautorComponent } from './registrarautor.component';

describe('RegistrarautorComponent', () => {
  let component: RegistrarautorComponent;
  let fixture: ComponentFixture<RegistrarautorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarautorComponent]
    });
    fixture = TestBed.createComponent(RegistrarautorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
