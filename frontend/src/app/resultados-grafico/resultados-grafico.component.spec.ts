import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosGraficoComponent } from './resultados-grafico.component';

describe('ResultadosGraficoComponent', () => {
  let component: ResultadosGraficoComponent;
  let fixture: ComponentFixture<ResultadosGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosGraficoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
