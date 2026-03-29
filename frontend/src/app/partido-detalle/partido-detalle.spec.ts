import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoDetalle } from './partido-detalle';

describe('PartidoDetalle', () => {
  let component: PartidoDetalle;
  let fixture: ComponentFixture<PartidoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidoDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
