import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSedes } from './mapa-sedes';

describe('MapaSedes', () => {
  let component: MapaSedes;
  let fixture: ComponentFixture<MapaSedes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaSedes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaSedes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
