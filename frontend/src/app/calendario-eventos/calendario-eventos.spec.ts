import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEventos } from './calendario-eventos';

describe('CalendarioEventos', () => {
  let component: CalendarioEventos;
  let fixture: ComponentFixture<CalendarioEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
