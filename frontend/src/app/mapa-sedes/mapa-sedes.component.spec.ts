import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSedesComponent } from './mapa-sedes.component';

describe('MapaSedesComponent', () => {
  let component: MapaSedesComponent;
  let fixture: ComponentFixture<MapaSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaSedesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaSedesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
