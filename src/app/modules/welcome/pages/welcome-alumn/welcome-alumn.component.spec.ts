import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAlumnComponent } from './welcome-alumn.component';

describe('WelcomeAlumnComponent', () => {
  let component: WelcomeAlumnComponent;
  let fixture: ComponentFixture<WelcomeAlumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeAlumnComponent]
    });
    fixture = TestBed.createComponent(WelcomeAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
