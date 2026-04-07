import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCompletoComponent } from './calendario-completo.component';

describe('CalendarioCompletoComponent', () => {
  let component: CalendarioCompletoComponent;
  let fixture: ComponentFixture<CalendarioCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioCompletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioCompletoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
