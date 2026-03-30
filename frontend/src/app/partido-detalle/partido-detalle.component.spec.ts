import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoDetalleComponent } from './partido-detalle.component';

describe('PartidoDetalleComponent', () => {
  let component: PartidoDetalleComponent;
  let fixture: ComponentFixture<PartidoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidoDetalleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
