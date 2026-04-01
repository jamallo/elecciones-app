import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEspaniaComponent } from './mapa-espania.component';

describe('MapaEspaniaComponent', () => {
  let component: MapaEspaniaComponent;
  let fixture: ComponentFixture<MapaEspaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaEspaniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaEspaniaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
