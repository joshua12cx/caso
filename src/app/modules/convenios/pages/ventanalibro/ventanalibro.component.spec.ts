import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanalibroComponent } from './ventanalibro.component';

describe('VentanalibroComponent', () => {
  let component: VentanalibroComponent;
  let fixture: ComponentFixture<VentanalibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanalibroComponent]
    });
    fixture = TestBed.createComponent(VentanalibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
