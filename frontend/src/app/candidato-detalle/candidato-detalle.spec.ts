import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoDetalle } from './candidato-detalle';

describe('CandidatoDetalle', () => {
  let component: CandidatoDetalle;
  let fixture: ComponentFixture<CandidatoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatoDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
