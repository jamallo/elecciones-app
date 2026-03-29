import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosGrafico } from './resultados-grafico';

describe('ResultadosGrafico', () => {
  let component: ResultadosGrafico;
  let fixture: ComponentFixture<ResultadosGrafico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosGrafico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosGrafico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
