import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioDetalleComponent } from './municipio-detalle.component';

describe('MunicipioDetalleComponent', () => {
  let component: MunicipioDetalleComponent;
  let fixture: ComponentFixture<MunicipioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipioDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipioDetalleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
